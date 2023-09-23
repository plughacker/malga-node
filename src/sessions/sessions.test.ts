import { server, request } from 'tests'

import { Sessions } from './sessions'
import { Session } from 'src/interfaces/sessions'
import { SessionResponse } from './sessions.types'
import { Api } from 'src/api'

const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

describe('Sessions', () => {
  test('should succeed in creating a session', async () => {
    const session: Session = {
      name: 'Payment Link',
      amount: 100,
      merchantId: 'aa2ec134-6164-4b5b-a7e2-85daefec318d',
      dueDate: '2023-12-27T03:00:00.000Z',
      capture: true,
      createLink: false,
      currency: 'BRL',
      description: 'Session description',
      isActive: true,
      orderId: 'b3f8fc27-56ca-4dbe-b4ed-b87efd6ccb95',
      statementDescriptor: 'Malga',
      paymentMethods: [
        { paymentType: 'credit', installments: 1 },
        { paymentType: 'pix', expiresIn: 60 },
      ],
      items: [{ name: 'Product 1', quantity: 1, unitPrice: 100 }],
    }

    const sessionResponse: SessionResponse = {
      createdAt: '2023-12-26T03:00:00.000Z',
      updatedAt: '2023-12-26T03:00:00.000Z',
      id: '802968b0-a173-4ee3-8016-a38453d02f00',
      publicKey: 'c1866c13-7b3f-4164-b0ac-8ab665164d34',
      status: 'created',
      paymentLink: '',
      ...session,
    }

    server.use(
      request.post('https://api.malga.io/v1/sessions', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(sessionResponse))
      }),
    )

    const sessions = new Sessions(api)
    const response = await sessions.create(session)

    expect(response).toMatchObject(sessionResponse)
  })

  test('should generate an error when trying to create the session', async () => {
    const session: Session = {
      name: 'Payment Link',
      amount: 100,
      merchantId: 'merchantId',
      dueDate: '2023-12-27T03:00:00.000Z',
      capture: true,
      createLink: false,
      currency: 'BRL',
      description: 'Session description',
      isActive: true,
      orderId: 'b3f8fc27-56ca-4dbe-b4ed-b87efd6ccb95',
      statementDescriptor: 'Malga',
      paymentMethods: [
        { paymentType: 'credit', installments: 1 },
        { paymentType: 'pix', expiresIn: 60 },
      ],
      items: [{ name: 'Product 1', quantity: 1, unitPrice: 100 }],
    }

    const error = {
      error: {
        type: 'bad_request',
        code: 400,
        message: 'Bad Request Exception',
        details: ['merchantId must be a UUID'],
      },
    }

    server.use(
      request.post('https://api.malga.io/v1/sessions', (_, res, ctx) => {
        return res(ctx.status(400), ctx.json(error))
      }),
    )

    const sessions = new Sessions(api)

    try {
      await sessions.create(session)
    } catch (err) {
      expect(err).toMatchObject(error)
    }
  })

  test('should succeed when find for a session by ID', async () => {
    const sessionId = '802968b0-a173-4ee3-8016-a38453d02f00'

    const sessionResponse = {
      id: sessionId,
      createdAt: '2023-12-26T03:00:00.000Z',
      updatedAt: '2023-12-26T03:00:00.000Z',
      publicKey: 'c1866c13-7b3f-4164-b0ac-8ab665164d34',
      status: 'created',
      paymentLink: '',
      name: 'Payment Link',
      amount: 100,
      merchantId: 'aa2ec134-6164-4b5b-a7e2-85daefec318d',
      dueDate: '2023-12-27T03:00:00.000Z',
      capture: true,
      createLink: false,
      currency: 'BRL',
      description: 'Session description',
      isActive: true,
      orderId: 'b3f8fc27-56ca-4dbe-b4ed-b87efd6ccb95',
      statementDescriptor: 'Malga',
      paymentMethods: [
        { paymentType: 'credit', installments: 1 },
        { paymentType: 'pix', expiresIn: 60 },
      ],
      items: [{ name: 'Product 1', quantity: 1, unitPrice: 100 }],
    }

    server.use(
      request.get(
        `https://api.malga.io/v1/sessions/${sessionId}`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(sessionResponse))
        },
      ),
    )

    const sessions = new Sessions(api)
    const response = await sessions.find(sessionId)

    expect(response).toMatchObject(sessionResponse)
  })

  test('should generate an error when find for a non-existent session', async () => {
    const sellerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    const error = {
      error: {
        type: 'entity_not_found',
        code: 404,
        message: 'unexpected error',
      },
    }

    server.use(
      request.get(
        `https://api.malga.io/v1/sessions/${sellerId}`,
        (_, res, ctx) => {
          return res(ctx.status(404), ctx.json(error))
        },
      ),
    )

    const sessions = new Sessions(api)

    try {
      await sessions.find(sellerId)
    } catch (err) {
      expect(err).toMatchObject(error)
    }
  })

  test('should succeed in listing the sessions', async () => {
    const sessionList = {
      items: [
        {
          id: '802968b0-a173-4ee3-8016-a38453d02f00',
          createdAt: '2023-12-26T03:00:00.000Z',
          updatedAt: '2023-12-26T03:00:00.000Z',
          publicKey: 'c1866c13-7b3f-4164-b0ac-8ab665164d34',
          status: 'created',
          paymentLink: '',
          name: 'Payment Link',
          amount: 100,
          merchantId: 'aa2ec134-6164-4b5b-a7e2-85daefec318d',
          dueDate: '2023-12-27T03:00:00.000Z',
          capture: true,
          createLink: false,
          currency: 'BRL',
          description: 'Session description',
          isActive: true,
          orderId: 'b3f8fc27-56ca-4dbe-b4ed-b87efd6ccb95',
          statementDescriptor: 'Malga',
          paymentMethods: [
            { paymentType: 'credit', installments: 1 },
            { paymentType: 'pix', expiresIn: 60 },
          ],
          items: [{ name: 'Product 1', quantity: 1, unitPrice: 100 }],
        },
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 15,
        totalPages: 1,
        currentPage: 1,
      },
    }

    server.use(
      request.get(`https://api.malga.io/v1/sessions`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(sessionList))
      }),
    )

    const sessions = new Sessions(api)
    const response = await sessions.list({
      limit: 15,
      page: 1,
      status: 'created',
      isActive: true,
      startDate: '2023-12-26T03:00:00.000Z',
    })

    expect(response).toMatchObject(sessionList)
  })

  test('should generate an error when listing the sessions', async () => {
    server.use(
      request.get(`https://api.malga.io/v1/sessions`, (_, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    const sessions = new Sessions(api)

    try {
      await sessions.list({
        limit: 15,
        page: 1,
        startDate: '2023-09-17T03:00:00.000Z',
        endDate: '2023-09-23T02:59:59.999Z',
      })
    } catch (err) {
      expect(err).toMatchObject({
        error: {
          type: 'api_error',
          code: 500,
          message: 'unexpected error',
        },
      })
    }
  })

  test('should succeed in canceling a session', async () => {
    const sessionId = 'bb39836e-8fdc-4f7d-b1de-1ed8016c6c88'
    const sessionResponse = {
      id: sessionId,
      status: 'canceled',
    }

    server.use(
      request.post(
        `https://api.malga.io/v1/sessions/${sessionId}/cancel`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(sessionResponse))
        },
      ),
    )

    const sessions = new Sessions(api)
    const response = await sessions.cancel(sessionId)

    expect(response).toMatchObject(sessionResponse)
  })

  test('should fail when canceling a session', async () => {
    const sessionId = 'bb39836e-8fdc-4f7d-b1de-1ed8016c6c88'

    server.use(
      request.post(
        `https://api.malga.io/v1/sessions/${sessionId}/cancel`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const sessions = new Sessions(api)
    try {
      await sessions.cancel(sessionId)
    } catch (err) {
      expect(err).toMatchObject({
        error: {
          type: 'api_error',
          code: 500,
          message: 'unexpected error',
        },
      })
    }
  })

  test('should succeed in enabling a session', async () => {
    const sessionId = 'bb39836e-8fdc-4f7d-b1de-1ed8016c6c88'
    const sessionResponse = {
      id: sessionId,
      isActive: true,
    }

    server.use(
      request.patch(
        `https://api.malga.io/v1/sessions/${sessionId}`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(sessionResponse))
        },
      ),
    )

    const sessions = new Sessions(api)
    const response = await sessions.enable(sessionId)

    expect(response).toMatchObject(sessionResponse)
  })

  test('should fail when enabling a session', async () => {
    const sessionId = 'bb39836e-8fdc-4f7d-b1de-1ed8016c6c88'

    server.use(
      request.patch(
        `https://api.malga.io/v1/sessions/${sessionId}`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const sessions = new Sessions(api)
    try {
      await sessions.enable(sessionId)
    } catch (err) {
      expect(err).toMatchObject({
        error: {
          type: 'api_error',
          code: 500,
          message: 'unexpected error',
        },
      })
    }
  })

  test('should succeed in disabling a session', async () => {
    const sessionId = 'bb39836e-8fdc-4f7d-b1de-1ed8016c6c88'
    const sessionResponse = {
      id: sessionId,
      isActive: false,
    }

    server.use(
      request.patch(
        `https://api.malga.io/v1/sessions/${sessionId}`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(sessionResponse))
        },
      ),
    )

    const sessions = new Sessions(api)
    const response = await sessions.disable(sessionId)

    expect(response).toMatchObject(sessionResponse)
  })

  test('should fail when disabling a session', async () => {
    const sessionId = 'bb39836e-8fdc-4f7d-b1de-1ed8016c6c88'

    server.use(
      request.patch(
        `https://api.malga.io/v1/sessions/${sessionId}`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const sessions = new Sessions(api)
    try {
      await sessions.disable(sessionId)
    } catch (err) {
      expect(err).toMatchObject({
        error: {
          type: 'api_error',
          code: 500,
          message: 'unexpected error',
        },
      })
    }
  })
})
