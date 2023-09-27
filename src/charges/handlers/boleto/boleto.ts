import { BaseHandler } from '../base'

import { Customer } from 'src/common/interfaces/customer'
import { ChargePaymentMethodBoleto } from 'src/charges/charges.types'

import { BoletoHandlerPayload } from './boleto.types'

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
      sourceType: this.parsePaymentSource(customer, customerId),
    })
  }
}
