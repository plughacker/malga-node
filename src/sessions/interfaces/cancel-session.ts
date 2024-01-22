import { SessionStatus } from './sessions'

export interface SessionCancelResponse {
  id: string
  status: SessionStatus
}
