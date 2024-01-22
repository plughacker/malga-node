export interface CardTokenizationPayload {
  holderName?: string
  number?: string
  cvv: string
  expirationDate?: string
}

export interface CardTokenizationResponse {
  tokenId: string
}
