import { server, request } from 'tests'
import { Api } from 'src/common/api'

import { Charges } from './charges'
import { Customers } from 'src/customers'
import { Cards } from 'src/cards'

const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })
const customers = new Customers(api)
const cards = new Cards(api)

describe('Charges', () => {
  test('should succeed when find for a charge by ID', async () => {
    const chargeId = 'eeef63e0-3147-48de-a140-e22f4981acc5'
    const chargeResponse = {
      id: 'eeef63e0-3147-48de-a140-e22f4981acc5',
      clientId: '115c5413-ba6e-44ae-b760-0f1dbc94ca48',
      merchantId: '88ef3bbc-e629-497a-81a8-3fcc43d97a1e',
      description: null,
      orderId: null,
      createdAt: '2023-09-22T12:05:15.995Z',
      amount: 100,
      originalAmount: 100,
      currency: 'BRL',
      statementDescriptor: null,
      capture: true,
      isDispute: false,
      status: 'authorized',
      paymentMethod: {
        installments: 1,
        paymentType: 'credit',
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'a65e20e3-d527-452a-8f2c-a613a7ce4bd1',
      },
      transactionRequests: [
        {
          id: '036247d1-4420-4c02-baf2-3d065617942a',
          createdAt: '2023-09-22T12:05:16.011Z',
          updatedAt: '2023-09-22T12:05:16.038Z',
          idempotencyKey: '095b761a-29f3-488e-915a-2a30ce0d58ad',
          providerId: '9899f359-ac79-4880-b1bf-b37376cba357',
          providerType: 'SANDBOX',
          transactionId: '3864701',
          amount: 991,
          authorizationCode: '5426331',
          authorizationNsu: '4573722',
          requestStatus: 'success',
          requestType: 'authorization',
          responseTs: '12ms',
          providerAuthorization: {
            networkAuthorizationCode: '5502158',
            networkResponseCode: '4804827',
          },
        },
      ],
      appInfo: null,
    }

    server.use(
      request.get(
        `https://api.malga.io/v1/charges/${chargeId}`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(chargeResponse))
        },
      ),
    )

    const charges = new Charges(api, cards, customers)
    const response = await charges.find(chargeId)

    expect(response).toMatchObject(chargeResponse)
  })

  test('should generate an error when find for a non-existent charge', async () => {
    const chargeId = '802968b0-a173-4ee3-8016-a38453d02f00'

    const error = {
      error: {
        type: 'entity_not_found',
        code: 404,
        message: 'unexpected error',
      },
    }

    server.use(
      request.get(
        `https://api.malga.io/v1/charges/${chargeId}`,
        (_, res, ctx) => {
          return res(ctx.status(404), ctx.json(error))
        },
      ),
    )

    const charges = new Charges(api, cards, customers)

    try {
      await charges.find(chargeId)
    } catch (err) {
      expect(err).toMatchObject(error)
    }
  })

  test('should succeed in listing the charges', async () => {
    const chargeList = {
      items: [
        {
          id: 'eeef63e0-3147-48de-a140-e22f4981acc5',
          clientId: '115c5413-ba6e-44ae-b760-0f1dbc94ca48',
          merchantId: '88ef3bbc-e629-497a-81a8-3fcc43d97a1e',
          description: null,
          orderId: '941faec4-cf37-4df0-b313-273bab37335e',
          createdAt: '2023-09-22T12:05:15.995Z',
          amount: 100,
          originalAmount: 100,
          currency: 'BRL',
          statementDescriptor: null,
          capture: true,
          isDispute: false,
          status: 'authorized',
          paymentMethod: {
            installments: 1,
            paymentType: 'credit',
          },
          paymentSource: {
            sourceType: 'card',
            cardId: 'a65e20e3-d527-452a-8f2c-a613a7ce4bd1',
          },
          transactionRequests: [
            {
              id: '036247d1-4420-4c02-baf2-3d065617942a',
              createdAt: '2023-09-22T12:05:16.011Z',
              updatedAt: '2023-09-22T12:05:16.038Z',
              idempotencyKey: '095b761a-29f3-488e-915a-2a30ce0d58ad',
              providerId: '9899f359-ac79-4880-b1bf-b37376cba357',
              providerType: 'SANDBOX',
              transactionId: '3864701',
              amount: 991,
              authorizationCode: '5426331',
              authorizationNsu: '4573722',
              requestStatus: 'success',
              requestType: 'authorization',
              responseTs: '12ms',
              providerAuthorization: {
                networkAuthorizationCode: '5502158',
                networkResponseCode: '4804827',
              },
            },
          ],
          appInfo: null,
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
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(chargeList))
      }),
    )

    const charges = new Charges(api, cards, customers)
    const response = await charges.list({
      limit: 15,
      page: 1,
      status: ['authorized'],
      amount: 991,
      hasSplit: false,
      merchantId: '88ef3bbc-e629-497a-81a8-3fcc43d97a1e',
      orderId: '941faec4-cf37-4df0-b313-273bab37335e',
      paymentMethod: ['credit'],
      provider: ['SANDBOX'],
      sort: 'DESC',
      startDate: '2023-12-26T03:00:00.000Z',
      endDate: '2023-12-27T03:00:00.000Z',
    })

    expect(response).toMatchObject(chargeList)
  })

  test('should generate an error when listing the charges', async () => {
    server.use(
      request.get('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    const charges = new Charges(api, cards, customers)

    try {
      await charges.list({
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

  test('should succeed in capturing a charge', async () => {
    const chargeId = 'eeef63e0-3147-48de-a140-e22f4981acc5'

    const chargeResponse = {
      id: chargeId,
      clientId: '115c5413-ba6e-44ae-b760-0f1dbc94ca48',
      merchantId: '88ef3bbc-e629-497a-81a8-3fcc43d97a1e',
      description: null,
      orderId: '941faec4-cf37-4df0-b313-273bab37335e',
      createdAt: '2023-09-22T12:05:15.995Z',
      amount: 100,
      originalAmount: 100,
      currency: 'BRL',
      statementDescriptor: null,
      capture: true,
      isDispute: false,
      status: 'authorized',
      paymentMethod: {
        installments: 1,
        paymentType: 'credit',
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'a65e20e3-d527-452a-8f2c-a613a7ce4bd1',
      },
      transactionRequests: [
        {
          id: '036247d1-4420-4c02-baf2-3d065617942a',
          createdAt: '2023-09-22T12:05:16.011Z',
          updatedAt: '2023-09-22T12:05:16.038Z',
          idempotencyKey: '095b761a-29f3-488e-915a-2a30ce0d58ad',
          providerId: '9899f359-ac79-4880-b1bf-b37376cba357',
          providerType: 'SANDBOX',
          transactionId: '3864701',
          amount: 991,
          authorizationCode: '5426331',
          authorizationNsu: '4573722',
          requestStatus: 'success',
          requestType: 'authorization',
          responseTs: '12ms',
          providerAuthorization: {
            networkAuthorizationCode: '5502158',
            networkResponseCode: '4804827',
          },
        },
      ],
      appInfo: null,
    }

    server.use(
      request.post(
        `https://api.malga.io/v1/charges/${chargeId}/capture`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(chargeResponse))
        },
      ),
    )

    const charges = new Charges(api, cards, customers)
    const response = await charges.capture(chargeId, {
      amount: 100,
    })

    expect(response).toMatchObject(chargeResponse)
  })

  test('should result in an error when capturing a charge', async () => {
    const chargeId = 'eeef63e0-3147-48de-a140-e22f4981acc5'

    server.use(
      request.post(
        `https://api.malga.io/v1/charges/${chargeId}/capture`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const charges = new Charges(api, cards, customers)

    try {
      await charges.capture(chargeId, {
        amount: 100,
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

  test('should succeed in refunding a charge', async () => {
    const chargeId = 'eeef63e0-3147-48de-a140-e22f4981acc5'

    const chargeResponse = {
      id: chargeId,
      clientId: '115c5413-ba6e-44ae-b760-0f1dbc94ca48',
      merchantId: '88ef3bbc-e629-497a-81a8-3fcc43d97a1e',
      description: null,
      orderId: '941faec4-cf37-4df0-b313-273bab37335e',
      createdAt: '2023-09-22T12:05:15.995Z',
      amount: 100,
      originalAmount: 100,
      currency: 'BRL',
      statementDescriptor: null,
      capture: true,
      isDispute: false,
      status: 'authorized',
      paymentMethod: {
        installments: 1,
        paymentType: 'credit',
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'a65e20e3-d527-452a-8f2c-a613a7ce4bd1',
      },
      transactionRequests: [
        {
          id: '036247d1-4420-4c02-baf2-3d065617942a',
          createdAt: '2023-09-22T12:05:16.011Z',
          updatedAt: '2023-09-22T12:05:16.038Z',
          idempotencyKey: '095b761a-29f3-488e-915a-2a30ce0d58ad',
          providerId: '9899f359-ac79-4880-b1bf-b37376cba357',
          providerType: 'SANDBOX',
          transactionId: '3864701',
          amount: 991,
          authorizationCode: '5426331',
          authorizationNsu: '4573722',
          requestStatus: 'success',
          requestType: 'authorization',
          responseTs: '12ms',
          providerAuthorization: {
            networkAuthorizationCode: '5502158',
            networkResponseCode: '4804827',
          },
        },
      ],
      appInfo: null,
    }

    server.use(
      request.post(
        `https://api.malga.io/v1/charges/${chargeId}/void`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(chargeResponse))
        },
      ),
    )

    const charges = new Charges(api, cards, customers)
    const response = await charges.refund(chargeId, {
      amount: 100,
    })

    expect(response).toMatchObject(chargeResponse)
  })

  test('should result in an error when refunding a charge', async () => {
    const chargeId = 'eeef63e0-3147-48de-a140-e22f4981acc5'

    server.use(
      request.post(
        `https://api.malga.io/v1/charges/${chargeId}/void`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const charges = new Charges(api, cards, customers)

    try {
      await charges.refund(chargeId, {
        amount: 100,
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
})
