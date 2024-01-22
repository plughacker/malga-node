import { server, request } from 'tests'
import { Api } from 'src/common/api'

import { Sandbox } from './sandbox'

import { expirationDate } from './sandbox.utils'

const api = new Api({
  apiKey: 'API_KEY',
  clientId: 'CLIENT_ID',
  options: { sandbox: true },
})

describe('Sandbox', () => {
  test('should succeed in changing the status of a charge in the sandbox', async () => {
    const chargeId = 'eeef63e0-3147-48de-a140-e22f4981acc5'
    const charge = {
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
      sourceType: {
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
        `https://sandbox-api.malga.io/v1/charges/${chargeId}`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(charge))
        },
      ),
    )

    const sandbox = new Sandbox(api, true)
    const response = await sandbox.changeChargeStatus(chargeId, {
      status: 'authorized',
    })
    expect(response).toMatchObject(charge)
  })

  test('should fail when changing the status of a transaction in the sandbox', async () => {
    const sandbox = new Sandbox(api, false)

    try {
      await sandbox.changeChargeStatus('eeef63e0-3147-48de-a140-e22f4981acc5', {
        status: 'pre_authorized',
      })
    } catch (err) {
      expect(!!err).toBeTruthy()
    }
  })

  test('should succeed in changing the status of antifraud in the sandbox', async () => {
    const chargeId = 'eeef63e0-3147-48de-a140-e22f4981acc5'
    const charge = {
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
      sourceType: {
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
      request.patch(
        `https://sandbox-api.malga.io/v1/charges/${chargeId}/antifraud`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(charge))
        },
      ),
    )

    const sandbox = new Sandbox(api, true)
    const response = await sandbox.changeAntifraudStatus(chargeId, {
      status: 'reproved',
    })
    expect(response).toMatchObject(charge)
  })

  test('should fail when changing the status of antifraud in the sandbox', async () => {
    const sandbox = new Sandbox(api, false)

    try {
      await sandbox.changeChargeStatus('eeef63e0-3147-48de-a140-e22f4981acc5', {
        status: 'pre_authorized',
      })
    } catch (err) {
      expect(!!err).toBeTruthy()
    }
  })

  test('should succeed in generating a test card in the sandbox', async () => {
    const sandbox = new Sandbox(api, true)
    const card = sandbox.generateCard({
      brand: 'Mastercard',
      status: 'authorized',
    })

    expect(card).toMatchObject({
      number: '5214254988499590',
      cvv: '220',
      expirationDate,
    })
  })

  test('should fail when generating a test card in the sandbox', async () => {
    const sandbox = new Sandbox(api, false)

    try {
      sandbox.generateCard({ brand: 'Amex', status: 'authorized' })
    } catch (err) {
      expect(!!err).toBeTruthy()
    }
  })
})
