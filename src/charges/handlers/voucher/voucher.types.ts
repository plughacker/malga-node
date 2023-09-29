import { ChargeHandlerResponse } from '../charge'
import { ChargePaymentMethodVoucher } from 'src/charges/charges.types'
import {
  ChargePaymentSourceCustomer,
  ChargePaymentSourceCustomerOneShot,
} from 'src/common/interfaces/charges'

export type VoucherHandlerPayload = ChargeHandlerResponse

type VoucherHandlerParsedResponse = {
  customerId: string
  paymentMethod: ChargePaymentMethodVoucher
  sourceType: ChargePaymentSourceCustomer | ChargePaymentSourceCustomerOneShot
}

export type VoucherHandlerResponse = VoucherHandlerParsedResponse &
  ChargeHandlerResponse
