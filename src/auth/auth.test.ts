import { server, request } from 'tests'

import { Api } from 'src/common/api'

import { Auth } from './auth'

const api = new Api({ apiKey: 'API_KEY', clientId: 'CLIENT_ID' })

describe('Auth', () => {
  test('should succeed in creating a public key', async () => {
    const endpointResponse = {
      publicKey: '30173513-f2a3-42ba-822e-14078ad74c06',
      createdAt: '2023-09-20T18:30:22.344Z',
      clientId: 'CLIENT_ID',
      expires: 600,
      scope: ['tokens', 'cards'],
    }

    server.use(
      request.post('https://api.malga.io/v1/auth', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(endpointResponse))
      }),
    )

    const auth = new Auth(api)
    const response = await auth.createPublicKey({
      expires: 600,
      scope: ['tokens', 'cards'],
    })

    expect(response).toMatchObject(endpointResponse)
  })

  test('should result in an error when creating a public key', async () => {
    server.use(
      request.post('https://api.malga.io/v1/auth', (_, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    const auth = new Auth(api)

    try {
      await auth.createPublicKey({
        expires: 600,
        scope: ['tokens', 'cards'],
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
