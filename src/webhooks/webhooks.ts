import crypto from 'node:crypto'

import { WebhookVerifyParams } from './interfaces'

export class Webhooks {
  constructor() {}

  /**
   * Verify the event signature
   *
   * @link https://docs.malga.io/docs/webhooks#como-verificar-a-assinatura-do-evento
   *
   * @param params - Object with webhook data for signature verification
   * @returns {bool}
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
   * const verified = malga.webhooks.verify({
   *   payload: '{"event":"ping","payload":{"object":{}}}',
   *   publicKey: '-----BEGIN PUBLIC KEY-----\nMCwBQYDK2VwAyEASdad=\n-----END PUBLIC KEY-----\n',
   *   signature: '5b20c43cfd55f0c1884196'
   *   signatureTime: 1661795163719,
   * })
   * ```
   */
  public verify(params: WebhookVerifyParams) {
    const payload = Buffer.from(params.payload, 'utf-8').toString()
    const signature = Buffer.from(params.signature, 'hex')
    const data = Buffer.from(`${params.signatureTime}\n${payload}`)

    return crypto.verify(null, data, params.publicKey, signature)
  }
}
