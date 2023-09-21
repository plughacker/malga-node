export interface WebhookVerifyParams {
  publicKey: string
  payload: string
  signatureTime: number
  signature: string
}
