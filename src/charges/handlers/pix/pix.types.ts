import { ChargeHandlerResponse } from '../charge'
import { ChargePaymentMethodPix } from 'src/charges/charges.types'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/common/interfaces/charges'

export type PixHandlerPayload = ChargeHandlerResponse

type PixHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodPix
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type PixHandlerResponse = PixHandlerParsedResponse &
  ChargeHandlerResponse
