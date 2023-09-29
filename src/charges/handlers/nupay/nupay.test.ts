import { NuPayHandler } from './nupay'

describe('NuPayHandler', () => {
  test('should succeed in parsing the NuPay data with the customer oneshot', () => {
    const nupayHandler = new NuPayHandler()
    const payload = nupayHandler.handle({
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
        type: 'nupay',
        orderUrl: 'https://localhost:3000/order',
        returnUrl: 'https://localhost:3000/return',
        cancelUrl: 'https://localhost:3000/cancel',
        delayToAutoCancel: 60,
        taxValue: 100,
        items: [
          {
            name: 'Product',
            quantity: 1,
            risk: 'Low',
            sku: '123',
            unitPrice: 100,
          },
        ],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'nupay',
        orderUrl: 'https://localhost:3000/order',
        returnUrl: 'https://localhost:3000/return',
        cancelUrl: 'https://localhost:3000/cancel',
        delayToAutoCancel: 60,
        taxValue: 100,
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
      fraudAnalysis: {
        cart: {
          items: [
            {
              name: 'Product',
              quantity: 1,
              risk: 'Low',
              sku: '123',
              unitPrice: 100,
            },
          ],
        },
      },
    })
  })

  test('should succeed in parsing the NuPay data with the customerId', () => {
    const nupayHandler = new NuPayHandler()
    const payload = nupayHandler.handle({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'nupay',
        orderUrl: 'https://localhost:3000/order',
        returnUrl: 'https://localhost:3000/return',
        cancelUrl: 'https://localhost:3000/cancel',
        delayToAutoCancel: 60,
        taxValue: 100,
        items: [
          {
            name: 'Product',
            quantity: 1,
            risk: 'Low',
            sku: '123',
            unitPrice: 100,
          },
        ],
      },
    })

    expect(payload).toMatchObject({
      merchantId: '9425a897-a247-4ca1-b6b5-9595431d6069',
      amount: 100,
      paymentMethod: {
        paymentType: 'nupay',
        orderUrl: 'https://localhost:3000/order',
        returnUrl: 'https://localhost:3000/return',
        cancelUrl: 'https://localhost:3000/cancel',
        delayToAutoCancel: 60,
        taxValue: 100,
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
      fraudAnalysis: {
        cart: {
          items: [
            {
              name: 'Product',
              quantity: 1,
              risk: 'Low',
              sku: '123',
              unitPrice: 100,
            },
          ],
        },
      },
    })
  })

  test('should pass to the next handler because the payment method is not NuPay', () => {
    const nupayHandler = new NuPayHandler()
    const payload = nupayHandler.handle({
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
