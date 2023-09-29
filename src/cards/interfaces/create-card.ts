import { CardResponse } from './cards'

export interface CardCreatePayload {
  tokenId: string
  zeroDollar?: {
    merchantId?: string
    cvvCheck?: boolean
  }
}

export type CardCreateResponse = Omit<
  CardResponse,
  'deletedAt' | 'deletedReason'
>
