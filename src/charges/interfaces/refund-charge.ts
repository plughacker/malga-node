import { Charge } from './charges'

export interface ChargeRefundPayload {
  amount: number
  delayToCompose?: number
}

export interface ChargeRefundResponse extends Charge {}
