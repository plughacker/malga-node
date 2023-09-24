import { ApiPaginateParamsBase } from 'src/common/api'

type CardStatus = 'failed' | 'active' | 'pending'

export interface CardCreatePayload {
  tokenId: string
  zeroDollar?: {
    merchantId?: string
    cvvCheck?: boolean
  }
}

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

export type CardListResponse = Omit<
  CardResponse,
  'deletedAt' | 'deletedReason' | 'statusReason'
>

export type CardCreateResponse = Omit<
  CardResponse,
  'deletedAt' | 'deletedReason'
>

export type CardListParams = Omit<ApiPaginateParamsBase, 'sort'>

export interface CardTokenizationPayload {
  holderName?: string
  number?: string
  cvv: string
  expirationDate?: string
}

export interface CardTokenizationResponse {
  tokenId: string
}
