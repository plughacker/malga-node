import { ApiPaginateParamsBase } from 'src/common/api'
import { Session } from 'src/common/interfaces/sessions'

type SessionStatus = 'created' | 'paid' | 'canceled' | 'voided'

export interface SessionResponse extends Omit<Session, 'createLink'> {
  createdAt: string
  updatedAt: string
  id: string
  publicKey: string
  paymentLink: string
  status: SessionStatus
}

export interface SessionListParams extends Omit<ApiPaginateParamsBase, 'sort'> {
  startDate?: string
  endDate?: string
  isActive?: boolean
  status?: SessionStatus
}

export interface SessionCancelResponse {
  id: string
  status: SessionStatus
}

export interface SessionActiveStatusResponse {
  id: string
  isActive: boolean
}
