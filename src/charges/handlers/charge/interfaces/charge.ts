import {
  ChargeCreatePayload,
  ChargeSessionCreatePayload,
} from 'src/charges/interfaces/create-charge'

export type ChargeHandlerPayload =
  | ChargeCreatePayload
  | ChargeSessionCreatePayload

export type ChargeHandlerResponse =
  | ChargeCreatePayload
  | ChargeSessionCreatePayload
