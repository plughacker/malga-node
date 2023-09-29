export interface CustomerCardsResponse {
  id: string
  status: 'failed' | 'active' | 'pending'
  createdAt: string
  clientId: string
  customerId: string
  brand: 'Mastercard'
  cardHolderName: string
  cvvChecked: boolean
  fingerprint: string | null
  first6digits: string
  last4digits: string
  expirationMonth: string
  expirationYear: string
}
