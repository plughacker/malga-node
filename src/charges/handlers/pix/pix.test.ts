import { PixHandler } from './pix'

describe('PixHandler', () => {
  test('should succeed in parsing the PIX data with the customer oneshot', () => {
    const pixHandler = new PixHandler()
    const payload = pixHandler.handle({
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
        type: 'pix',
        expiresIn: 600,
        additionalInfo: [{ name: 'test', value: 'test' }],
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'pix',
        expiresIn: 600,
        additionalInfo: [{ name: 'test', value: 'test' }],
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

  test('should succeed in parsing the PIX data with the customerId', () => {
    const pixHandler = new PixHandler()
    const payload = pixHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 600,
        additionalInfo: [{ name: 'test', value: 'test' }],
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'pix',
        expiresIn: 600,
        additionalInfo: [{ name: 'test', value: 'test' }],
        items: [{ id: '1', name: 'Product 1', quantity: 1, unitPrice: 100 }],
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
    })
  })

  test('should pass to the next handler because the payment method is not PIX', () => {
    const pixHandler = new PixHandler()
    const payload = pixHandler.handle({
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
