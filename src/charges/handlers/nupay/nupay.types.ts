import { ChargeHandlerResponse } from '../charge'
import { ChargePaymentMethodNuPay } from 'src/charges/charges.types'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/common/interfaces/charges'

export type NuPayHandlerPayload = ChargeHandlerResponse

type NuPayHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodNuPay
  paymentSource:
    | ChargePaymentSourceCustomer
    | ChargePaymentSourceCustomerOneShot
}

export type NuPayHandlerResponse = NuPayHandlerParsedResponse &
  ChargeHandlerResponse
