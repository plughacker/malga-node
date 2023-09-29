import { ChargeHandlerResponse } from '../../charge'
import { ChargePaymentMethodVoucher } from 'src/charges/interfaces/create-charge'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/charges/interfaces/charges'

export type VoucherHandlerPayload = ChargeHandlerResponse

type VoucherHandlerParsedResponse = {
  customerId: string
  paymentMethod: ChargePaymentMethodVoucher
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type VoucherHandlerResponse = VoucherHandlerParsedResponse &
  ChargeHandlerResponse
