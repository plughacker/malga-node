import { server, request } from 'tests'

import { Api } from './api'

describe('API', () => {
  test('should make the request to the production domain', async () => {
    const apiKey = 'API_KEY'
    const clientId = 'CLIENT_ID'

    server.use(
      request.get('https://api.malga.io/v1/charges', (req, res, ctx) => {
        const apiKeyHeader = req.headers.get('X-Api-Key') === apiKey
        const clientIdHeader = req.headers.get('X-Client-Id') === clientId
        const domain = req.url.origin === 'https://api.malga.io'
        const condition = apiKeyHeader && clientIdHeader && domain

        const response = { status: condition ? 'ok' : 'error' }

        return res(ctx.status(200), ctx.json(response))
      }),
    )

    const api = new Api({ apiKey, clientId })
    const response = await api.get('/charges')

    expect(response).toMatchObject({ status: 'ok' })
  })

  test('should make the request to the sandbox domain', async () => {
    const apiKey = 'API_KEY'
    const clientId = 'CLIENT_ID'

    server.use(
      request.get(
        'https://sandbox-api.malga.io/v1/charges',
        (req, res, ctx) => {
          const apiKeyHeader = req.headers.get('X-Api-Key') === apiKey
          const clientIdHeader = req.headers.get('X-Client-Id') === clientId
          const domain = req.url.origin === 'https://sandbox-api.malga.io'
          const condition = apiKeyHeader && clientIdHeader && domain

          const response = { status: condition ? 'ok' : 'error' }

          return res(ctx.status(200), ctx.json(response))
        },
      ),
    )

    const api = new Api({
      apiKey,
      clientId,
      options: { sandbox: true },
    })
    const response = await api.get('/charges')

    expect(response).toMatchObject({ status: 'ok' })
  })

  test('should send the idempotency key correctly', async () => {
    const apiKey = 'API_KEY'
    const clientId = 'CLIENT_ID'
    const idempotencyKey = 'idempotencyKey'

    server.use(
      request.post('https://api.malga.io/v1/charges', (req, res, ctx) => {
        const apiKeyHeader = req.headers.get('X-Api-Key') === apiKey
        const clientIdHeader = req.headers.get('X-Client-Id') === clientId
        const idempotencyKeyHeader =
          req.headers.get('X-Idempotency-Key') === idempotencyKey
        const domain = req.url.origin === 'https://api.malga.io'
        const condition =
          apiKeyHeader && clientIdHeader && domain && idempotencyKeyHeader

        const response = { status: condition ? 'ok' : 'error' }

        return res(ctx.status(200), ctx.json(response))
      }),
    )

    const api = new Api({ apiKey, clientId })
    const response = await api.post('/charges', {}, idempotencyKey)

    expect(response).toMatchObject({ status: 'ok' })
  })

  test('should handle a request failure', async () => {
    server.use(
      request.post('https://api.malga.io/v1/charges', (_, res, ctx) =>
        res(ctx.status(400), ctx.json({ status: 'error' })),
      ),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    try {
      await api.post('/charges', {})
    } catch (error) {
      expect(error).toMatchObject({ status: 'error' })
    }
  })

  test('should handle pagination query parameters correctly', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (req, res, ctx) => {
        const page = Number(req.url.searchParams.get('page')) === 2
        const limit = Number(req.url.searchParams.get('limit')) === 15
        const response = { status: page && limit ? 'ok' : 'error' }

        return res(ctx.status(200), ctx.json(response))
      }),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })
    const response = await api.paginate('/charges', { page: 2, limit: 15 })

    expect(response).toMatchObject({ status: 'ok' })
  })

  test('should handle pagination when there are no parameters correctly', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (req, res, ctx) => {
        const url = req.url.href
        const response = {
          status: url === 'https://api.malga.io/v1/charges' ? 'ok' : 'error',
        }

        return res(ctx.status(200), ctx.json(response))
      }),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })
    const response = await api.paginate('/charges')

    expect(response).toMatchObject({ status: 'ok' })
  })

  test('should handle the unauthorized request error message', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(ctx.status(403), ctx.json({ message: 'Forbidden' }))
      }),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    try {
      await api.get('/charges')
    } catch (error) {
      expect(error).toMatchObject({
        error: {
          type: 'invalid_request_error',
          code: 403,
          message: 'forbidden',
        },
      })
    }
  })

  test('should handle the unauthorized request error message', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(ctx.status(403), ctx.json({ message: 'Forbidden' }))
      }),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    try {
      await api.get('/charges')
    } catch (error) {
      expect(error).toMatchObject({
        error: {
          type: 'invalid_request_error',
          code: 403,
          message: 'forbidden',
        },
      })
    }
  })

  test('should handle the error message with data from an unexpected request error', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Unexpected error' }))
      }),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    try {
      await api.get('/charges')
    } catch (error) {
      expect(error).toMatchObject({
        error: {
          type: 'api_error',
          code: 500,
          message: 'unexpected error',
        },
      })
    }
  })

  test('should handle the error message without data from an unexpected request error', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(ctx.status(503))
      }),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    try {
      await api.get('/charges')
    } catch (error) {
      expect(error).toMatchObject({
        error: {
          type: 'api_error',
          code: 500,
          message: 'unexpected error',
        },
      })
    }
  })

  test('should handle the error message for a request with a "card_declined" error.', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            error: {
              type: 'card_declined',
              code: 400,
              declined_code: 'invalid_expiration_date',
              message: 'Invalid expiration date. Check the data and try again',
            },
          }),
        )
      }),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    try {
      await api.get('/charges')
    } catch (error) {
      expect(error).toMatchObject({
        error: {
          type: 'card_declined',
          code: 400,
          declinedCode: 'invalid_expiration_date',
          message: 'Invalid expiration date. Check the data and try again',
        },
      })
    }
  })
})
