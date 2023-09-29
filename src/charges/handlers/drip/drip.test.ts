import { DripHandler } from './drip'

describe('DripHandler', () => {
  test('should succeed in parsing the Drip data with the customer oneshot', () => {
    const dripHandler = new DripHandler()
    const payload = dripHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
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
        type: 'drip',
        successUrl: 'https://localhost:3000/success',
        cancelUrl: 'https://localhost:3000/cancel',
        browser: {
          browserFingerprint: 'a30798702adff345f4a8ee095fba5bf9',
          ipAddress: '127.0.0.1',
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'drip',
        successUrl: 'https://localhost:3000/success',
        cancelUrl: 'https://localhost:3000/cancel',
        browser: {
          browserFingerprint: 'a30798702adff345f4a8ee095fba5bf9',
          ipAddress: '127.0.0.1',
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'customer',
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
      },
    })
  })

  test('should succeed in parsing the Drip data with the customerId', () => {
    const dripHandler = new DripHandler()
    const payload = dripHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'drip',
        successUrl: 'https://localhost:3000/success',
        cancelUrl: 'https://localhost:3000/cancel',
        browser: {
          browserFingerprint: 'a30798702adff345f4a8ee095fba5bf9',
          ipAddress: '127.0.0.1',
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'drip',
        successUrl: 'https://localhost:3000/success',
        cancelUrl: 'https://localhost:3000/cancel',
        browser: {
          browserFingerprint: 'a30798702adff345f4a8ee095fba5bf9',
          ipAddress: '127.0.0.1',
        },
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
    })
  })

  test('should pass to the next handler because the payment method is not Drip', () => {
    const dripHandler = new DripHandler()
    const payload = dripHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 100,
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 100,
      },
    })
  })
})
