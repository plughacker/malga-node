import { ChargeHandlerResponse } from '../../charge'
import { ChargePaymentMethodNuPay } from 'src/charges/interfaces/create-charge'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/charges/interfaces/charges'

export type NuPayHandlerPayload = ChargeHandlerResponse

type NuPayHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodNuPay
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type NuPayHandlerResponse = NuPayHandlerParsedResponse &
  ChargeHandlerResponse
