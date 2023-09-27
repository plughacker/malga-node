import { ChargeHandlerResponse } from '../charge'
import { ChargePaymentMethodDrip } from 'src/charges/charges.types'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/common/interfaces/charges'

export type DripHandlerPayload = ChargeHandlerResponse

type DripHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodDrip
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type DripHandlerResponse = DripHandlerParsedResponse &
  ChargeHandlerResponse
