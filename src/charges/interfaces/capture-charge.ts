import { Charge } from './charges'

export interface ChargeCapturePayload {
  amount: number
}

export interface ChargeCaptureResponse extends Charge {}
