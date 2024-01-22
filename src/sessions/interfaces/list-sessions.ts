import {
  ApiPaginateParamsBase,
  ApiPaginateResponse,
} from 'src/common/interfaces'

import { SessionResponse, SessionStatus } from './sessions'

export interface SessionListParams extends Omit<ApiPaginateParamsBase, 'sort'> {
  startDate?: string
  endDate?: string
  isActive?: boolean[]
  status?: SessionStatus[]
}

export type SessionListResponse = ApiPaginateResponse<SessionResponse>
