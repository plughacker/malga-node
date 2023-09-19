import { server, request } from 'tests'

import { Api } from './api'

describe('API', () => {
  test('should make the request to the production domain', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) =>
        res(ctx.status(200)),
      ),
    )

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })
    const response = await api.get('/charges')

    expect(response.config.headers['X-Api-Key']).toEqual('API_KEY')
    expect(response.config.headers['X-Client-Id']).toEqual('CLIENT_ID')
    expect(response.config.headers['X-Idempotency-Key']).not.toBeDefined()
    expect(response.config.baseURL).toEqual('https://api.malga.io/v1')
  })

  test('should make the request to the sandbox domain', async () => {
    server.use(
      request.get('https://sandbox-api.malga.io/v1/charges', (_, res, ctx) =>
        res(ctx.status(200)),
      ),
    )

    const api = new Api({
      apiKey: 'API_KEY',
      clientId: 'CLIENT_ID',
      options: { sandbox: true },
    })
    const response = await api.get('/charges')

    expect(response.config.headers['X-Api-Key']).toEqual('API_KEY')
    expect(response.config.headers['X-Client-Id']).toEqual('CLIENT_ID')
    expect(response.config.headers['X-Idempotency-Key']).not.toBeDefined()
    expect(response.config.baseURL).toEqual('https://sandbox-api.malga.io/v1')
  })

  test('should send the idempotency key correctly', async () => {
    server.use(
      request.post('https://api.malga.io/v1/charges', (_, res, ctx) =>
        res(ctx.status(200)),
      ),
    )

    const idempotencyKey = 'idempotencyKey'

    const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })
    const response = await api.post('/charges', {}, idempotencyKey)

    expect(response.config.headers['X-Api-Key']).toEqual('API_KEY')
    expect(response.config.headers['X-Client-Id']).toEqual('CLIENT_ID')
    expect(response.config.headers['X-Idempotency-Key']).toEqual(idempotencyKey)
    expect(response.config.baseURL).toEqual('https://api.malga.io/v1')
  })
})
