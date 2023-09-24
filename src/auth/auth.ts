import { Api, ApiPostOptions } from 'src/common/api'

import {
  AuthCreatePublicKeyPayload,
  AuthCreatePublicKeyResponse,
} from './auth.types'

export class Auth {
  constructor(private readonly api: Api) {}

  /**
   * Create a publicKey
   *
   * @link https://docs.malga.io/api#operation/create_auth_token
   *
   * @param payload - Send the `scope` that determines access to endpoints and the `expires` in seconds for the key expiration time
   * @param options - API options like `idempotencyKey`
   * @returns Customer API response
   *
   * @example
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * const { publicKey } = await malga.auth.createPublicKey({
   *   scope: ['tokens', 'cards'],
   *   expires: 600, // in seconds
   * })
   * ```
   */
  public async createPublicKey(
    payload: AuthCreatePublicKeyPayload,
    options?: ApiPostOptions,
  ): Promise<AuthCreatePublicKeyResponse> {
    return this.api.post('/auth', payload, options?.idempotencyKey)
  }
}
