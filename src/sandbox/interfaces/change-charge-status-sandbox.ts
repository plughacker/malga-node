import { Charge, ChargeStatusTypes } from 'src/charges/interfaces/charges'

export interface SandboxChangeChargeStatusPayload {
  status: ChargeStatusTypes
}

export interface SandboxChangeChargeStatusResponse extends Charge {}
