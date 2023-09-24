import { server, request } from 'tests'
import { Api } from 'src/common/api'

import { Customers } from './customers'

const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

describe('Customers', () => {
  test('should succeed in creating a customer', async () => {
    const customer = {
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
    }

    const newCustomer = {
      id: '802968b0-a173-4ee3-8016-a38453d02f00',
      createdAt: '2023-09-20T18:30:22.344Z',
      ...customer,
    }

    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(newCustomer))
      }),
    )

    const customers = new Customers(api)
    const response = await customers.create(customer)

    expect(response).toMatchObject(newCustomer)
  })

  test('should generate an error when trying to create the customer', async () => {
    const customer = {
      name: 'Homer Simpson',
      email: 'email',
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
    }

    const error = {
      error: {
        type: 'bad_request',
        code: 400,
        message: 'Bad Request Exception',
        details: ['email must be an email'],
      },
    }

    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(ctx.status(400), ctx.json(error))
      }),
    )

    const customers = new Customers(api)

    try {
      await customers.create(customer)
    } catch (err) {
      expect(err).toMatchObject(error)
    }
  })

  test('should succeed when find for a customer by ID', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'
    const customer = {
      id: customerId,
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
    }

    server.use(
      request.get(
        `https://api.malga.io/v1/customers/${customerId}`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(customer))
        },
      ),
    )

    const customers = new Customers(api)
    const response = await customers.find(customerId)

    expect(response).toMatchObject(customer)
  })

  test('should generate an error when find for a non-existent customer', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    const error = {
      error: {
        type: 'api_error',
        code: 404,
        message: 'Unexpected error',
      },
    }

    server.use(
      request.get(
        `https://api.malga.io/v1/customers/${customerId}`,
        (_, res, ctx) => {
          return res(ctx.status(404), ctx.json(error))
        },
      ),
    )

    const customers = new Customers(api)

    try {
      await customers.find(customerId)
    } catch (err) {
      expect(err).toMatchObject(error)
    }
  })

  test('should succeed in listing the customers', async () => {
    const customerList = {
      items: [
        {
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
      request.get(`https://api.malga.io/v1/customers`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(customerList))
      }),
    )

    const customers = new Customers(api)
    const response = await customers.list({ limit: 15, page: 1 })

    expect(response).toMatchObject(customerList)
  })

  test('should generate an error when listing the customers', async () => {
    server.use(
      request.get(`https://api.malga.io/v1/customers`, (_, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    const customers = new Customers(api)

    try {
      await customers.list({ limit: 15, page: 1 })
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

  test('should succeed in updating a customer', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    const customer = {
      name: 'Homer Simpson',
      phoneNumber: '99999999999',
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
    }

    const customerResponse = {
      id: customerId,
      updatedAt: '2023-09-20T18:30:22.344Z',
      createdAt: '2023-09-20T18:30:22.344Z',
      idempotencyKey: null,
      requestId: null,
      clientId: 'CLIENT_ID',
      cardId: null,
      name: 'Homer Simpsons',
      email: 'homer@simpsons.com',
      phoneNumber: '99999999999',
      documentNumber: '67112968003',
      documentType: 'cpf',
      documentCountry: 'BR',
      address: {
        country: 'US',
        id: 'd3a273c4-845a-4f01-8857-856fa810c58d',
        updatedAt: '2023-09-21T10:03:03.590Z',
        createdAt: '2023-06-21T21:33:56.070Z',
        idempotencyKey: null,
        requestId: null,
        street: 'Evergreen Terrace',
        streetNumber: '742',
        complement: 'Residence',
        zipCode: '62629',
        state: 'Louisiana',
        city: 'Springfield',
        district: 'Suburb',
        deletedAt: null,
      },
    }

    server.use(
      request.patch(
        `https://api.malga.io/v1/customers/${customerId}`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(customerResponse))
        },
      ),
    )

    const customers = new Customers(api)
    const response = await customers.update(customerId, customer)

    expect(response).toMatchObject(customerResponse)
  })

  test('should generate an error when updating a customer', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    const customer = {
      name: 'Homer Simpson',
      phoneNumber: '99999999999',
      address: {
        street: 'Evergreen Terrace',
        streetNumber: '742',
        zipCode: '62629',
        country: 'USA',
        state: 'Louisiana',
        city: 'Springfield',
        district: 'Suburb',
        complement: 'Residence',
      },
    }

    const error = {
      error: {
        type: 'bad_request',
        code: 400,
        message: 'Bad Request Exception',
        details: [
          'address.country must be one of the following values: AL, AD, AR, AT, AU, BA, BZ, BE, BG, BR, BY, CA, CU, CY, CZ, CH, CL, CN, CO, CR, DE, DK, DO, EC, EE, SV, GT, FI, FR, GB, GR, HR, HK, HU, IS, ID, IE, IN, IL, IT, LI, LT, LU, LV, MK, MC, MD, MT, MU, JP, KR, MX, ME, MY, NL, NZ, NO, PY, PE, PK, PL, PT, RU, RO, SM, RS, SE, SG, TH, TW, TR, SI, SK, ES, UY, UA, US, VE, VN, ZA, BO, PA',
        ],
      },
    }

    server.use(
      request.patch(
        `https://api.malga.io/v1/customers/${customerId}`,
        (_, res, ctx) => {
          return res(ctx.status(400), ctx.json(error))
        },
      ),
    )

    const customers = new Customers(api)

    try {
      await customers.update(customerId, customer)
    } catch (err) {
      expect(err).toMatchObject(error)
    }
  })

  test('should succeed in removing a customer', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    server.use(
      request.delete(
        `https://api.malga.io/v1/customers/${customerId}`,
        (_, res, ctx) => {
          return res(ctx.status(200))
        },
      ),
    )

    const customers = new Customers(api)
    const response = await customers.remove(customerId)

    expect(response).toBeFalsy()
  })

  test('should generate an error when removing a customer', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    server.use(
      request.delete(
        `https://api.malga.io/v1/customers/${customerId}`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const customers = new Customers(api)

    try {
      await customers.remove(customerId)
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

  test('should succeed in listing the customer cards', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    const customerCards = [
      {
        customerId,
        id: 'fafd9d72-b148-4a29-9528-f167f2dea972',
        status: 'active',
        createdAt: '2023-09-20T18:30:22.344Z',
        clientId: 'CLIENT_ID',
        brand: 'Mastercard',
        cardHolderName: 'Homer Simpson',
        cvvChecked: true,
        fingerprint: null,
        first6digits: '538957',
        last4digits: '1603',
        expirationMonth: '02',
        expirationYear: '30',
      },
    ]

    server.use(
      request.get(
        `https://api.malga.io/v1/customers/${customerId}/cards`,
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(customerCards))
        },
      ),
    )

    const customers = new Customers(api)
    const response = await customers.cards(customerId)

    expect(response).toMatchObject(customerCards)
  })

  test('should generate an error when listing the customer cards', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    server.use(
      request.get(
        `https://api.malga.io/v1/customers/${customerId}/cards`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const customers = new Customers(api)

    try {
      await customers.cards(customerId)
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

  test('should succeed in linking a card to the customer', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    server.use(
      request.post(
        `https://api.malga.io/v1/customers/${customerId}/cards`,
        (_, res, ctx) => {
          return res(ctx.status(204))
        },
      ),
    )

    const customers = new Customers(api)
    const response = await customers.linkCard(customerId, {
      cardId: 'aad2a5fa-31f2-424d-810c-4d8ff8ec515b',
    })

    expect(response).toBeFalsy()
  })

  test('should generate an error when linking a card to the customer', async () => {
    const customerId = '802968b0-a173-4ee3-8016-a38453d02f00'

    server.use(
      request.post(
        `https://api.malga.io/v1/customers/${customerId}/cards`,
        (_, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )

    const customers = new Customers(api)

    try {
      await customers.linkCard(customerId, {
        cardId: '2b616cc5-0625-432f-9fd9-6d9880b7685d',
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
