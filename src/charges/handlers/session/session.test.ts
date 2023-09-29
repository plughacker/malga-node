import { SessionHandler } from './session'

describe('SessionHandler', () => {
  test('should succeed in parsing the session', () => {
    const sessionHandler = new SessionHandler()
    const payload = sessionHandler.handle({
      sessionId: '935b1193-e7d1-4612-8a98-08f6e3fb1dcf',
      publicKey: '86082c7f-f998-4beb-8771-6e7240ef8636',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 60,
      },
    })

    expect(payload).toMatchObject({
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 60,
      },
    })
  })

  test('should pass to the next handler because is not session', () => {
    const sessionHandler = new SessionHandler()
    const payload = sessionHandler.handle({
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
