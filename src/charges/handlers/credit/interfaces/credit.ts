import { ChargeHandlerResponse } from '../../charge'
import { ChargePaymentMethodCredit } from 'src/charges/interfaces/create-charge'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/charges/interfaces/charges'

export type CreditHandlerPayload = ChargeHandlerResponse

type CreditHandlerParsedResponse = {
  customerId: string
  paymentMethod: ChargePaymentMethodCredit
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type CreditHandlerResponse = CreditHandlerParsedResponse &
  ChargeHandlerResponse
