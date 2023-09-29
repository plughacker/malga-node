import { Api } from 'src/common/api'
import { ChargeCreateBuilder } from './charge-create-builder'
import { Cards } from 'src/cards'
import { Customers } from 'src/customers'

const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })
const cards = new Cards(api)
const customers = new Customers(api)

describe('ChargeCreateBuilder', () => {
  test('should succeed in building the credit payload.', async () => {
    const chargeCreateBuilder = new ChargeCreateBuilder(cards, customers)
    const payload = await chargeCreateBuilder.payload({
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        type: 'credit',
        cardId: '7ccdc5e8-ef7a-4034-9f12-c385e7f53437',
        cardCvv: '170',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        paymentType: 'credit',
      },
      paymentSource: {
        sourceType: 'card',
        cardId: '7ccdc5e8-ef7a-4034-9f12-c385e7f53437',
        cardCvv: '170',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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

  test('should succeed in building the voucher payload.', async () => {
    const chargeCreateBuilder = new ChargeCreateBuilder(cards, customers)
    const payload = await chargeCreateBuilder.payload({
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        type: 'voucher',
        cardId: '7ccdc5e8-ef7a-4034-9f12-c385e7f53437',
        tokenCvv: '9ecd47f2-e9ad-4180-bcbe-fc7f117b7fdb',
        items: [
          {
            id: '1',
            name: 'Product 1',
            quantity: 1,
            unitPrice: 100,
          },
        ],
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      amount: 100,
      paymentMethod: {
        paymentType: 'voucher',
        items: [
          {
            id: '1',
            name: 'Product 1',
            quantity: 1,
            unitPrice: 100,
          },
        ],
      },
      paymentSource: {
        sourceType: 'card',
        cardId: '7ccdc5e8-ef7a-4034-9f12-c385e7f53437',
        tokenCvv: '9ecd47f2-e9ad-4180-bcbe-fc7f117b7fdb',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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

  test('should succeed in building the PIX payload.', async () => {
    const chargeCreateBuilder = new ChargeCreateBuilder(cards, customers)
    const payload = await chargeCreateBuilder.payload({
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 60,
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      paymentMethod: {
        paymentType: 'pix',
        expiresIn: 60,
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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

  test('should succeed in building the boleto payload.', async () => {
    const chargeCreateBuilder = new ChargeCreateBuilder(cards, customers)
    const payload = await chargeCreateBuilder.payload({
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'boleto',
        expiresDate: '2024-12-31',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      paymentMethod: {
        paymentType: 'boleto',
        expiresDate: '2024-12-31',
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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

  test('should succeed in building the NuPay payload.', async () => {
    const chargeCreateBuilder = new ChargeCreateBuilder(cards, customers)
    const payload = await chargeCreateBuilder.payload({
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'nupay',
        delayToAutoCancel: 60,
        items: [
          {
            name: 'Product 1',
            quantity: 1,
            risk: 'Low',
            sku: '1',
            unitPrice: 100,
          },
        ],
      },
      fraudAnalysis: {
        sla: 99,
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
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      paymentMethod: {
        paymentType: 'nupay',
        delayToAutoCancel: 60,
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              name: 'Product 1',
              quantity: 1,
              risk: 'Low',
              sku: '1',
              unitPrice: 100,
            },
          ],
        },
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

  test('should succeed in building the Drip payload.', async () => {
    const chargeCreateBuilder = new ChargeCreateBuilder(cards, customers)
    const payload = await chargeCreateBuilder.payload({
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'drip',
        items: [
          {
            id: '1',
            name: 'Product 1',
            quantity: 1,
            unitPrice: 100,
          },
        ],
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              sku: '1',
              risk: 'Low',
              name: 'Product 1',
              quantity: 1,
              unitPrice: 100,
            },
          ],
        },
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
      merchantId: '6d7fd1a2-f863-4983-bbea-dd8c34679f99',
      amount: 100,
      paymentMethod: {
        paymentType: 'drip',
        items: [
          {
            id: '1',
            name: 'Product 1',
            quantity: 1,
            unitPrice: 100,
          },
        ],
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              sku: '1',
              risk: 'Low',
              name: 'Product 1',
              quantity: 1,
              unitPrice: 100,
            },
          ],
        },
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

  test('should succeed in building the session payload.', async () => {
    const chargeCreateBuilder = new ChargeCreateBuilder(cards, customers)
    const payload = await chargeCreateBuilder.payload({
      sessionId: 'b60952bf-32ed-4e84-8475-3bd1b179d94a',
      publicKey: '86082c7f-f998-4beb-8771-6e7240ef8636',
      customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      paymentMethod: {
        type: 'pix',
        expiresIn: 60,
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              sku: '1',
              risk: 'Low',
              name: 'Product 1',
              quantity: 1,
              unitPrice: 100,
            },
          ],
        },
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
      paymentMethod: {
        paymentType: 'pix',
        expiresIn: 60,
      },
      paymentSource: {
        sourceType: 'customer',
        customerId: 'fa68fbab-8807-410f-ac9f-8994e566038f',
      },
      fraudAnalysis: {
        sla: 99,
        cart: {
          items: [
            {
              sku: '1',
              risk: 'Low',
              name: 'Product 1',
              quantity: 1,
              unitPrice: 100,
            },
          ],
        },
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
