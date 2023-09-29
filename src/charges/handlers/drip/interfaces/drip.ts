import { ChargeHandlerResponse } from '../../charge'
import { ChargePaymentMethodDrip } from 'src/charges/interfaces/create-charge'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/charges/interfaces/charges'

export type DripHandlerPayload = ChargeHandlerResponse

type DripHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodDrip
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type DripHandlerResponse = DripHandlerParsedResponse &
  ChargeHandlerResponse
