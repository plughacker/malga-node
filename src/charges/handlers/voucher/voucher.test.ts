import { server, request } from 'tests'

import { Api } from 'src/common/api'
import { Cards } from 'src/cards'

import { VoucherHandler } from './voucher'
import { Customers } from 'src/customers'

const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })
const cards = new Cards(api)
const customers = new Customers(api)

describe('VoucherHandler', () => {
  test('should succeed in parsing the voucher data with tokenId', async () => {
    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        type: 'voucher',
        tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'token',
        tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
      },
    })
  })

  test('should succeed in parsing the voucher data with cardId', async () => {
    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        type: 'voucher',
        cardId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
      },
    })
  })

  test('should succeed in parsing the voucher data with cardId and cvv', async () => {
    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        type: 'voucher',
        cardId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
        cardCvv: '170',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
        cardCvv: '170',
      },
    })
  })

  test('should succeed in parsing the voucher data with cardId and tokenCvv', async () => {
    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        type: 'voucher',
        cardId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
        tokenCvv: '9ecd47f2-e9ad-4180-bcbe-fc7f117b7fdb',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
        tokenCvv: '9ecd47f2-e9ad-4180-bcbe-fc7f117b7fdb',
      },
    })
  })

  test('should succeed in parsing the voucher data with the customer oneshot', async () => {
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

    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...customer,
            id: 'fa68fbab-8807-410f-ac9f-8994e566038f',
            createdAt: '2023-12-26T03:00:00.000Z',
          }),
        )
      }),
    )

    server.use(
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2' }),
        )
      }),
    )

    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customer,
      paymentMethod: {
        type: 'voucher',
        card: {
          holderName: 'Homer Simpson',
          number: '5401177501978548',
          cvv: '192',
          expirationDate: '10/2024',
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'token',
        tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
      },
    })
  })

  test('should succeed in parsing the voucher data with the customer oneshot and full tokenization', async () => {
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

    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...customer,
            id: 'fa68fbab-8807-410f-ac9f-8994e566038f',
            createdAt: '2023-12-26T03:00:00.000Z',
          }),
        )
      }),
    )

    server.use(
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2' }),
        )
      }),
    )

    server.use(
      request.post('https://api.malga.io/v1/cards', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ id: 'f0544db1-851a-45f1-865e-cd7c973962db' }),
        )
      }),
    )

    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customer,
      paymentMethod: {
        type: 'voucher',
        card: {
          holderName: 'Homer Simpson',
          number: '5401177501978548',
          cvv: '192',
          expirationDate: '10/2024',
          zeroDollar: {
            cvvCheck: true,
            merchantId: '8a7bf953-ddeb-4c3d-aa0c-fcebb402b271',
          },
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'f0544db1-851a-45f1-865e-cd7c973962db',
      },
    })
  })

  test('should succeed in parsing the voucher data with the customer oneshot, full tokenization and link card to customer', async () => {
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

    const customerId = 'fa68fbab-8807-410f-ac9f-8994e566038f'

    server.use(
      request.post('https://api.malga.io/v1/customers', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...customer,
            id: customerId,
            createdAt: '2023-12-26T03:00:00.000Z',
          }),
        )
      }),
    )

    server.use(
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2' }),
        )
      }),
    )

    server.use(
      request.post('https://api.malga.io/v1/cards', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ id: 'f0544db1-851a-45f1-865e-cd7c973962db' }),
        )
      }),
    )

    server.use(
      request.post(
        `https://api.malga.io/v1/customer/${customerId}/cards`,
        (_, res, ctx) => {
          return res(ctx.status(200))
        },
      ),
    )

    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customer,
      paymentMethod: {
        type: 'voucher',
        card: {
          holderName: 'Homer Simpson',
          number: '5401177501978548',
          cvv: '192',
          expirationDate: '10/2024',
          zeroDollar: {
            cvvCheck: true,
            merchantId: '8a7bf953-ddeb-4c3d-aa0c-fcebb402b271',
          },
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      customerId,
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'f0544db1-851a-45f1-865e-cd7c973962db',
      },
    })
  })

  test('should succeed in parsing the voucher data with the customerId', async () => {
    server.use(
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2' }),
        )
      }),
    )

    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'voucher',
        card: {
          holderName: 'Homer Simpson',
          number: '5401177501978548',
          cvv: '192',
          expirationDate: '10/2024',
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'token',
        tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2',
      },
    })
  })

  test('should succeed in parsing the voucher data with the customerId and full tokenization', async () => {
    server.use(
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2' }),
        )
      }),
    )

    server.use(
      request.post('https://api.malga.io/v1/cards', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ id: 'f0544db1-851a-45f1-865e-cd7c973962db' }),
        )
      }),
    )

    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'voucher',
        card: {
          holderName: 'Homer Simpson',
          number: '5401177501978548',
          cvv: '192',
          expirationDate: '10/2024',
          zeroDollar: {
            cvvCheck: true,
            merchantId: '8a7bf953-ddeb-4c3d-aa0c-fcebb402b271',
          },
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'f0544db1-851a-45f1-865e-cd7c973962db',
      },
    })
  })

  test('should succeed in parsing the voucher data with the customerId, full tokenization and link card to customer', async () => {
    const customerId = 'fa68fbab-8807-410f-ac9f-8994e566038f'

    server.use(
      request.post('https://api.malga.io/v1/tokens', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ tokenId: '41d4c30d-a628-4a29-ad16-150df4310cd2' }),
        )
      }),
    )

    server.use(
      request.post('https://api.malga.io/v1/cards', (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ id: 'f0544db1-851a-45f1-865e-cd7c973962db' }),
        )
      }),
    )

    server.use(
      request.post(
        `https://api.malga.io/v1/customer/${customerId}/cards`,
        (_, res, ctx) => {
          return res(ctx.status(200))
        },
      ),
    )

    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId,
      paymentMethod: {
        type: 'voucher',
        card: {
          holderName: 'Homer Simpson',
          number: '5401177501978548',
          cvv: '192',
          expirationDate: '10/2024',
          zeroDollar: {
            cvvCheck: true,
            merchantId: '8a7bf953-ddeb-4c3d-aa0c-fcebb402b271',
          },
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: 'f0544db1-851a-45f1-865e-cd7c973962db',
      },
    })
  })

  test('should pass to the next handler because the payment method is not voucher', async () => {
    const voucherHandler = new VoucherHandler(cards, customers)
    const payload = await voucherHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'drip',
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'drip',
      },
    })
  })
})
