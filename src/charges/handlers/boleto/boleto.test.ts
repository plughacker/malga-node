import { BoletoHandler } from './boleto'

describe('BoletoHandler', () => {
  test('should succeed in parsing the boleto data with the customer oneshot', () => {
    const boletoHandler = new BoletoHandler()
    const payload = boletoHandler.handle({
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
        type: 'boleto',
        expiresDate: '2024-12-31',
        instructions: 'instructions',
        fine: {
          days: 1,
          amount: 100,
        },
        interest: {
          days: 1,
          amount: 100,
        },
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'boleto',
        expiresDate: '2024-12-31',
        instructions: 'instructions',
        fine: {
          days: 1,
          amount: 100,
        },
        interest: {
          days: 1,
          amount: 100,
        },
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

  test('should succeed in parsing the boleto data with the customerId', () => {
    const boletoHandler = new BoletoHandler()
    const payload = boletoHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'boleto',
        expiresDate: '2024-12-31',
        instructions: 'instructions',
        fine: {
          days: 1,
          amount: 100,
        },
        interest: {
          days: 1,
          amount: 100,
        },
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'boleto',
        expiresDate: '2024-12-31',
        instructions: 'instructions',
        fine: {
          days: 1,
          amount: 100,
        },
        interest: {
          days: 1,
          amount: 100,
        },
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
    })
  })

  test('should pass to the next handler because the payment method is not boleto', () => {
    const boletoHandler = new BoletoHandler()
    const payload = boletoHandler.handle({
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
