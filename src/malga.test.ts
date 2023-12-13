import { server, request } from 'tests'

import { Malga } from './malga'

describe('Malga', () => {
  test('should create a charge by performing each of the steps separately', async () => {
    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '802968b0-a173-4ee3-8016-a38453d02f00',
            createdAt: '2023-09-20T18:30:22.344Z',
            name: 'Homer Simpson',
            email: 'homer@simpsons.com',
            phoneNumber: '99999999999',
            document: {
              type: 'cpf',
              number: '99999999999',
              country: 'BR',
            },
            address: {
              street: 'Evergreen Terrace',
              streetNumber: '742',
              zipCode: '62629',
              country: 'US',
              state: 'Louisiana',
              city: 'Springfield',
              district: 'Suburb',
              complement: 'Residence',
            },
          }),
        )
      }),
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '46cac74f-2212-49db-b583-58a534fa21fa' }),
        )
      }),
      request.post('https://api.malga.io/v1/cards', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
            status: 'active',
            createdAt: '2023-12-26T03:00:00.000Z',
            clientId: 'd6cad5c2-6026-4e70-9474-b84a703e3444',
            customerId: null,
            brand: 'Mastercard',
            cardHolderName: 'Homer Simpson',
            cvvChecked: true,
            fingerprint: '/cddsad2sgTXxfNhdsadasdas2QSLsJ/dsadsadcxc=',
            first6digits: '511848',
            last4digits: '2250',
            expirationMonth: '03',
            expirationYear: '2024',
          }),
        )
      }),
      request.post('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '76ae1681-f0b1-4849-a6ef-e9c93649e6c7',
            clientId: 'CLIENT_ID',
            merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
            description: null,
            orderId: null,
            createdAt: '2023-09-27T18:27:02.017Z',
            amount: 100,
            originalAmount: 100,
            currency: 'BRL',
            statementDescriptor: null,
            capture: false,
            isDispute: false,
            status: 'pre_authorized',
            paymentMethod: {
              paymentType: 'credit',
              installments: 12,
            },
            paymentSource: {
              sourceType: 'card',
              cardId: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
            },
            transactionRequests: [
              {
                id: '838380e8-9cdf-4084-a0cc-837051001119',
                createdAt: '2023-09-27T18:27:02.077Z',
                updatedAt: '2023-09-27T18:27:02.212Z',
                idempotencyKey: 'e6a3d815-2929-4bba-8b3d-b3be19796f38',
                providerId: '5819c91d-d6c0-42d5-bd14-c410bbebb6ac',
                providerType: 'SANDBOX',
                transactionId: 'b93a3922-1787-4940-a655-ae944253c45e',
                amount: 100,
                authorizationCode: '9023792',
                authorizationNsu: '0210428',
                requestStatus: 'success',
                requestType: 'pre_authorization',
                responseTs: '41ms',
                providerAuthorization: {
                  networkAuthorizationCode: '9490770',
                  networkResponseCode: '3767930',
                },
              },
            ],
            appInfo: {
              platform: {
                name: 'Node.js SDK',
                version: '0.0.1',
                integrator: 'Malga',
              },
            },
          }),
        )
      }),
    )

    const malga = new Malga({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    const customer = await malga.customers.create({
      name: 'Homer Simpson',
      email: 'homer@simpsons.com',
      phoneNumber: '99999999999',
      document: {
        type: 'cpf',
        number: '99999999999',
        country: 'BR',
      },
      address: {
        street: 'Evergreen Terrace',
        streetNumber: '742',
        zipCode: '62629',
        country: 'US',
        state: 'Louisiana',
        city: 'Springfield',
        district: 'Suburb',
        complement: 'Residence',
      },
    })

    const tokenization = await malga.cards.tokenization({
      holderName: 'Homer Simpson',
      number: '5175292227256170',
      expirationDate: '05/2025',
      cvv: '893',
    })

    const card = await malga.cards.create({
      tokenId: tokenization.tokenId,
      zeroDollar: {
        cvvCheck: true,
        merchantId: 'd917e90f-dd9c-439d-8b34-255ae53380a2',
      },
    })

    const charge = await malga.charges.create({
      merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
      customerId: customer.id,
      amount: 100,
      paymentMethod: {
        type: 'credit',
        installments: 12,
        cardId: card.id,
      },
    })

    expect(charge).toMatchObject({
      id: '76ae1681-f0b1-4849-a6ef-e9c93649e6c7',
      clientId: 'CLIENT_ID',
      merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
      description: null,
      orderId: null,
      createdAt: '2023-09-27T18:27:02.017Z',
      amount: 100,
      originalAmount: 100,
      currency: 'BRL',
      statementDescriptor: null,
      capture: false,
      isDispute: false,
      status: 'pre_authorized',
      paymentMethod: {
        paymentType: 'credit',
        installments: 12,
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
      },
      transactionRequests: [
        {
          id: '838380e8-9cdf-4084-a0cc-837051001119',
          createdAt: '2023-09-27T18:27:02.077Z',
          updatedAt: '2023-09-27T18:27:02.212Z',
          idempotencyKey: 'e6a3d815-2929-4bba-8b3d-b3be19796f38',
          providerId: '5819c91d-d6c0-42d5-bd14-c410bbebb6ac',
          providerType: 'SANDBOX',
          transactionId: 'b93a3922-1787-4940-a655-ae944253c45e',
          amount: 100,
          authorizationCode: '9023792',
          authorizationNsu: '0210428',
          requestStatus: 'success',
          requestType: 'pre_authorization',
          responseTs: '41ms',
          providerAuthorization: {
            networkAuthorizationCode: '9490770',
            networkResponseCode: '3767930',
          },
        },
      ],
      appInfo: {
        platform: {
          name: 'Node.js SDK',
          version: '0.0.1',
          integrator: 'Malga',
        },
      },
    })
  })

  test('should create a charge in a simplified manner', async () => {
    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '802968b0-a173-4ee3-8016-a38453d02f00',
            createdAt: '2023-09-20T18:30:22.344Z',
            name: 'Homer Simpson',
            email: 'homer@simpsons.com',
            phoneNumber: '99999999999',
            document: {
              type: 'cpf',
              number: '99999999999',
              country: 'BR',
            },
            address: {
              street: 'Evergreen Terrace',
              streetNumber: '742',
              zipCode: '62629',
              country: 'US',
              state: 'Louisiana',
              city: 'Springfield',
              district: 'Suburb',
              complement: 'Residence',
            },
          }),
        )
      }),
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '46cac74f-2212-49db-b583-58a534fa21fa' }),
        )
      }),
      request.post('https://api.malga.io/v1/cards', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
            status: 'active',
            createdAt: '2023-12-26T03:00:00.000Z',
            clientId: 'd6cad5c2-6026-4e70-9474-b84a703e3444',
            customerId: null,
            brand: 'Mastercard',
            cardHolderName: 'Homer Simpson',
            cvvChecked: true,
            fingerprint: '/cddsad2sgTXxfNhdsadasdas2QSLsJ/dsadsadcxc=',
            first6digits: '511848',
            last4digits: '2250',
            expirationMonth: '03',
            expirationYear: '2024',
          }),
        )
      }),
      request.post('https://api.malga.io/v1/charges', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '76ae1681-f0b1-4849-a6ef-e9c93649e6c7',
            clientId: 'CLIENT_ID',
            merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
            description: null,
            orderId: null,
            createdAt: '2023-09-27T18:27:02.017Z',
            amount: 100,
            originalAmount: 100,
            currency: 'BRL',
            statementDescriptor: null,
            capture: false,
            isDispute: false,
            status: 'pre_authorized',
            paymentMethod: {
              paymentType: 'credit',
              installments: 12,
            },
            paymentSource: {
              sourceType: 'card',
              cardId: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
            },
            transactionRequests: [
              {
                id: '838380e8-9cdf-4084-a0cc-837051001119',
                createdAt: '2023-09-27T18:27:02.077Z',
                updatedAt: '2023-09-27T18:27:02.212Z',
                idempotencyKey: 'e6a3d815-2929-4bba-8b3d-b3be19796f38',
                providerId: '5819c91d-d6c0-42d5-bd14-c410bbebb6ac',
                providerType: 'SANDBOX',
                transactionId: 'b93a3922-1787-4940-a655-ae944253c45e',
                amount: 100,
                authorizationCode: '9023792',
                authorizationNsu: '0210428',
                requestStatus: 'success',
                requestType: 'pre_authorization',
                responseTs: '41ms',
                providerAuthorization: {
                  networkAuthorizationCode: '9490770',
                  networkResponseCode: '3767930',
                },
              },
            ],
            appInfo: {
              platform: {
                name: 'Node.js SDK',
                version: '0.0.1',
                integrator: 'Malga',
              },
            },
          }),
        )
      }),
    )

    const malga = new Malga({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    const charge = await malga.charges.create({
      merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
      amount: 100,
      customer: {
        name: 'Homer Simpson',
        email: 'homer@simpsons.com',
        phoneNumber: '99999999999',
        document: {
          type: 'cpf',
          number: '99999999999',
          country: 'BR',
        },
        address: {
          street: 'Evergreen Terrace',
          streetNumber: '742',
          zipCode: '62629',
          country: 'US',
          state: 'Louisiana',
          city: 'Springfield',
          district: 'Suburb',
          complement: 'Residence',
        },
      },
      paymentMethod: {
        type: 'credit',
        installments: 12,
        card: {
          holderName: 'Homer Simpson',
          number: '5175292227256170',
          expirationDate: '05/2025',
          cvv: '893',
          zeroDollar: {
            cvvCheck: true,
            merchantId: 'd917e90f-dd9c-439d-8b34-255ae53380a2',
          },
        },
      },
    })

    expect(charge).toMatchObject({
      id: '76ae1681-f0b1-4849-a6ef-e9c93649e6c7',
      clientId: 'CLIENT_ID',
      merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
      description: null,
      orderId: null,
      createdAt: '2023-09-27T18:27:02.017Z',
      amount: 100,
      originalAmount: 100,
      currency: 'BRL',
      statementDescriptor: null,
      capture: false,
      isDispute: false,
      status: 'pre_authorized',
      paymentMethod: {
        paymentType: 'credit',
        installments: 12,
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
      },
      transactionRequests: [
        {
          id: '838380e8-9cdf-4084-a0cc-837051001119',
          createdAt: '2023-09-27T18:27:02.077Z',
          updatedAt: '2023-09-27T18:27:02.212Z',
          idempotencyKey: 'e6a3d815-2929-4bba-8b3d-b3be19796f38',
          providerId: '5819c91d-d6c0-42d5-bd14-c410bbebb6ac',
          providerType: 'SANDBOX',
          transactionId: 'b93a3922-1787-4940-a655-ae944253c45e',
          amount: 100,
          authorizationCode: '9023792',
          authorizationNsu: '0210428',
          requestStatus: 'success',
          requestType: 'pre_authorization',
          responseTs: '41ms',
          providerAuthorization: {
            networkAuthorizationCode: '9490770',
            networkResponseCode: '3767930',
          },
        },
      ],
      appInfo: {
        platform: {
          name: 'Node.js SDK',
          version: '0.0.1',
          integrator: 'Malga',
        },
      },
    })
  })

  test('should create a charge with a session', async () => {
    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: '802968b0-a173-4ee3-8016-a38453d02f00',
            createdAt: '2023-09-20T18:30:22.344Z',
            name: 'Homer Simpson',
            email: 'homer@simpsons.com',
            phoneNumber: '99999999999',
            document: {
              type: 'cpf',
              number: '99999999999',
              country: 'BR',
            },
            address: {
              street: 'Evergreen Terrace',
              streetNumber: '742',
              zipCode: '62629',
              country: 'US',
              state: 'Louisiana',
              city: 'Springfield',
              district: 'Suburb',
              complement: 'Residence',
            },
          }),
        )
      }),
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '46cac74f-2212-49db-b583-58a534fa21fa' }),
        )
      }),
      request.post('https://api.malga.io/v1/cards', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
            status: 'active',
            createdAt: '2023-12-26T03:00:00.000Z',
            clientId: 'd6cad5c2-6026-4e70-9474-b84a703e3444',
            customerId: null,
            brand: 'Mastercard',
            cardHolderName: 'Homer Simpson',
            cvvChecked: true,
            fingerprint: '/cddsad2sgTXxfNhdsadasdas2QSLsJ/dsadsadcxc=',
            first6digits: '511848',
            last4digits: '2250',
            expirationMonth: '03',
            expirationYear: '2024',
          }),
        )
      }),
      request.post('https://api.malga.io/v1/sessions', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            createdAt: '2023-12-26T03:00:00.000Z',
            updatedAt: '2023-12-26T03:00:00.000Z',
            id: '802968b0-a173-4ee3-8016-a38453d02f00',
            publicKey: 'c1866c13-7b3f-4164-b0ac-8ab665164d34',
            status: 'created',
            paymentLink: '',
            name: 'Payment Link',
            amount: 100,
            merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
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
          }),
        )
      }),
      request.post(
        'https://api.malga.io/v1/sessions/802968b0-a173-4ee3-8016-a38453d02f00/charge',
        (_, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              id: '76ae1681-f0b1-4849-a6ef-e9c93649e6c7',
              clientId: 'CLIENT_ID',
              merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
              description: null,
              orderId: null,
              createdAt: '2023-09-27T18:27:02.017Z',
              amount: 100,
              originalAmount: 100,
              currency: 'BRL',
              statementDescriptor: null,
              capture: false,
              isDispute: false,
              status: 'pre_authorized',
              paymentMethod: {
                paymentType: 'credit',
                installments: 12,
              },
              paymentSource: {
                sourceType: 'card',
                cardId: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
              },
              transactionRequests: [
                {
                  id: '838380e8-9cdf-4084-a0cc-837051001119',
                  createdAt: '2023-09-27T18:27:02.077Z',
                  updatedAt: '2023-09-27T18:27:02.212Z',
                  idempotencyKey: 'e6a3d815-2929-4bba-8b3d-b3be19796f38',
                  providerId: '5819c91d-d6c0-42d5-bd14-c410bbebb6ac',
                  providerType: 'SANDBOX',
                  transactionId: 'b93a3922-1787-4940-a655-ae944253c45e',
                  amount: 100,
                  authorizationCode: '9023792',
                  authorizationNsu: '0210428',
                  requestStatus: 'success',
                  requestType: 'pre_authorization',
                  responseTs: '41ms',
                  providerAuthorization: {
                    networkAuthorizationCode: '9490770',
                    networkResponseCode: '3767930',
                  },
                },
              ],
              appInfo: {
                platform: {
                  name: 'Node.js SDK',
                  version: '0.0.1',
                  integrator: 'Malga',
                },
              },
            }),
          )
        },
      ),
    )

    const malga = new Malga({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

    const session = await malga.sessions.create({
      name: 'Payment Link',
      amount: 100,
      merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
      dueDate: '2023-12-27T03:00:00.000Z',
      capture: false,
      createLink: false,
      currency: 'BRL',
      isActive: true,
      orderId: 'b3f8fc27-56ca-4dbe-b4ed-b87efd6ccb95',
      paymentMethods: [
        { paymentType: 'credit', installments: 1 },
        { paymentType: 'pix', expiresIn: 60 },
      ],
      items: [{ name: 'Product 1', quantity: 1, unitPrice: 100 }],
    })

    const charge = await malga.charges.create({
      publicKey: session.publicKey,
      sessionId: session.id,
      customer: {
        name: 'Homer Simpson',
        email: 'homer@simpsons.com',
        phoneNumber: '99999999999',
        document: {
          type: 'cpf',
          number: '99999999999',
          country: 'BR',
        },
        address: {
          street: 'Evergreen Terrace',
          streetNumber: '742',
          zipCode: '62629',
          country: 'US',
          state: 'Louisiana',
          city: 'Springfield',
          district: 'Suburb',
          complement: 'Residence',
        },
      },
      paymentMethod: {
        type: 'credit',
        installments: 12,
        card: {
          holderName: 'Homer Simpson',
          number: '5175292227256170',
          expirationDate: '05/2025',
          cvv: '893',
          zeroDollar: {
            cvvCheck: true,
            merchantId: 'd917e90f-dd9c-439d-8b34-255ae53380a2',
          },
        },
      },
    })

    expect(charge).toMatchObject({
      id: '76ae1681-f0b1-4849-a6ef-e9c93649e6c7',
      clientId: 'CLIENT_ID',
      merchantId: '418bd302-e616-4c11-b94d-c584c747e01e',
      description: null,
      orderId: null,
      createdAt: '2023-09-27T18:27:02.017Z',
      amount: 100,
      originalAmount: 100,
      currency: 'BRL',
      statementDescriptor: null,
      capture: false,
      isDispute: false,
      status: 'pre_authorized',
      paymentMethod: {
        paymentType: 'credit',
        installments: 12,
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'eea6505e-702f-47a1-8ab7-5a33cd8006b5',
      },
      transactionRequests: [
        {
          id: '838380e8-9cdf-4084-a0cc-837051001119',
          createdAt: '2023-09-27T18:27:02.077Z',
          updatedAt: '2023-09-27T18:27:02.212Z',
          idempotencyKey: 'e6a3d815-2929-4bba-8b3d-b3be19796f38',
          providerId: '5819c91d-d6c0-42d5-bd14-c410bbebb6ac',
          providerType: 'SANDBOX',
          transactionId: 'b93a3922-1787-4940-a655-ae944253c45e',
          amount: 100,
          authorizationCode: '9023792',
          authorizationNsu: '0210428',
          requestStatus: 'success',
          requestType: 'pre_authorization',
          responseTs: '41ms',
          providerAuthorization: {
            networkAuthorizationCode: '9490770',
            networkResponseCode: '3767930',
          },
        },
      ],
      appInfo: {
        platform: {
          name: 'Node.js SDK',
          version: '0.0.1',
          integrator: 'Malga',
        },
      },
    })
  })
})
