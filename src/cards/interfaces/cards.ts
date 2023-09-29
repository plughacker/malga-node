type CardStatus = 'failed' | 'active' | 'pending'

export interface CardResponse {
  id: string
  status: CardStatus
  createdAt: string
  clientId: string
  customerId: string | null
  brand: string
  cardHolderName: string
  cvvChecked: boolean
  fingerprint: string
  first6digits: string
  last4digits: string
  expirationMonth: string
  expirationYear: string
  statusReason?: string
  deletedAt?: string
  deletedReason?: string
}
