import {
  ChargeCreatePayload,
  ChargeSessionCreatePayload,
} from '../../charges.types'

export type ChargeHandlerPayload =
  | ChargeCreatePayload
  | ChargeSessionCreatePayload

export type ChargeHandlerResponse =
  | ChargeCreatePayload
  | ChargeSessionCreatePayload
