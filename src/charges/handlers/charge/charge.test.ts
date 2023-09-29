import { ChargeHandler } from './charge'

describe('ChargeHandler', () => {
  test('should succeed in parsing the threeDSecure', () => {
    const chargeHandler = new ChargeHandler()
    const payload = chargeHandler.handle({
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        type: 'pix',
        expiresIn: 60,
      },
      threeDSecure: {
        browser: {
          acceptHeader: 'acceptHeader',
          colorDepth: 24,
          ip: '127.0.0.1',
          javaEnabled: true,
          javaScriptEnabled: true,
          language: 'pt-BR',
          screenHeight: 1080,
          screenWidth: 1920,
          timeZoneOffset: '0',
          userAgent: 'userAgent',
        },
        redirectURL: 'https://localhost:3000',
        requestorURL: 'https://localhost:3000',
      },
    })

    expect(payload).toMatchObject({
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 60,
      },
      threeDSecure2: {
        browser: {
          acceptHeader: 'acceptHeader',
          colorDepth: 24,
          ip: '127.0.0.1',
          javaEnabled: true,
          javaScriptEnabled: true,
          language: 'pt-BR',
          screenHeight: 1080,
          screenWidth: 1920,
          timeZoneOffset: '0',
          userAgent: 'userAgent',
        },
        redirectURL: 'https://localhost:3000',
        requestorURL: 'https://localhost:3000',
      },
    })
  })
})
