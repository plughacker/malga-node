import { Charge } from 'src/charges/interfaces/charges'

export interface SandboxChangeAntifraudStatusPayload {
  status: 'approved' | 'reproved' | 'failed'
}

export interface SandboxChangeAntifraudStatusResponse extends Charge {}
