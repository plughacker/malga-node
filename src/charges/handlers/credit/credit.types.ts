import { ChargeHandlerResponse } from '../charge'
import { ChargePaymentMethodCredit } from 'src/charges/charges.types'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/common/interfaces/charges'

export type CreditHandlerPayload = ChargeHandlerResponse

type CreditHandlerParsedResponse = {
  customerId: string
  paymentMethod: ChargePaymentMethodCredit
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type CreditHandlerResponse = CreditHandlerParsedResponse &
  ChargeHandlerResponse
