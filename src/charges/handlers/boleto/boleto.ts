import { BaseHandler } from '../base'

import { Customer } from 'src/customers/interfaces/customers'

import { ChargePaymentMethodBoleto } from 'src/charges/interfaces/create-charge'
import { BoletoHandlerPayload } from './interfaces'

export class BoletoHandler extends BaseHandler {
  private parsePaymentMethod(paymentMethod: ChargePaymentMethodBoleto) {
    const { type, ...rest } = paymentMethod

    return {
      paymentType: 'boleto',
      ...rest,
    }
  }

  private parsePaymentSource(customer?: Customer, customerId?: string) {
    if (!customer && !customerId) return {}

    if (customerId) {
      return {
        sourceType: 'customer',
        customerId,
      }
    }

    return {
      sourceType: 'customer',
      customer,
    }
  }

  public handle(payload: BoletoHandlerPayload) {
    // Call next handler because paymentMethod has already been parsed
    if (payload.paymentMethod?.type !== 'boleto') {
      return super.handle(payload)
    }

    const { paymentMethod, customer, customerId, ...rest } = payload

    return super.handle({
      ...rest,
      paymentMethod: this.parsePaymentMethod(paymentMethod),
      paymentSource: this.parsePaymentSource(customer, customerId),
    })
  }
}
