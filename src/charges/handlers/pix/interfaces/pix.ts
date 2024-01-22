import { ChargeHandlerResponse } from '../../charge'
import { ChargePaymentMethodPix } from 'src/charges/interfaces/create-charge'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/charges/interfaces/charges'

export type PixHandlerPayload = ChargeHandlerResponse

type PixHandlerParsedResponse = {
  paymentMethod: ChargePaymentMethodPix
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type PixHandlerResponse = PixHandlerParsedResponse &
  ChargeHandlerResponse
