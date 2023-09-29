import { ChargeHandlerResponse } from '../../charge'
import { ChargePaymentMethodBoleto } from 'src/charges/interfaces/create-charge'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/charges/interfaces/charges'

export type BoletoHandlerPayload = ChargeHandlerResponse

type BoletoHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodBoleto
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type BoletoHandlerResponse = BoletoHandlerParsedResponse &
  ChargeHandlerResponse
