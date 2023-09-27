import { ChargeHandlerResponse } from '../charge'
import { ChargePaymentMethodBoleto } from 'src/charges/charges.types'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/common/interfaces/charges'

export type BoletoHandlerPayload = ChargeHandlerResponse

type BoletoHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodBoleto
  paymentSource:
    | ChargePaymentSourceCustomer
    | ChargePaymentSourceCustomerOneShot
}

export type BoletoHandlerResponse = BoletoHandlerParsedResponse &
  ChargeHandlerResponse
