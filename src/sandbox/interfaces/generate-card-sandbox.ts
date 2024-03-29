export type GenerateCardBrand =
  | 'Mastercard'
  | 'Visa'
  | 'Amex'
  | 'HiperCard'
  | 'DinersClub'

export type GenerateCardStatus =
  | 'authorized'
  | 'unauthorized'
  | 'blocked_card'
  | 'canceled_card'
  | 'expired_card'
  | 'invalid_cvv'
  | 'timeout'
  | 'authorized_or_timeout'

export interface SandboxGenerateCardParams {
  brand: GenerateCardBrand
  status: GenerateCardStatus
}

export interface SandboxGenerateCardResponse {
  number: string
  cvv: string
  expirationDate: string
}
