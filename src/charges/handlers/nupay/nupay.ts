import { BaseHandler } from '../base'

import { Customer } from 'src/customers/interfaces/customers'
import { ChargePaymentMethodNuPay } from 'src/charges/interfaces/create-charge'

import { NuPayHandlerPayload } from './interfaces'

export class NuPayHandler extends BaseHandler {
  private parsePaymentMethod(paymentMethod: ChargePaymentMethodNuPay) {
    const { type, items, ...rest } = paymentMethod

    return {
      paymentType: 'nupay',
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

  public handle(payload: NuPayHandlerPayload) {
    // Call next handler because paymentMethod has already been parsed
    if (payload.paymentMethod?.type !== 'nupay') {
      return super.handle(payload)
    }

    const { paymentMethod, customer, customerId, ...rest } = payload

    return super.handle({
      ...rest,
      paymentMethod: this.parsePaymentMethod(paymentMethod),
      paymentSource: this.parsePaymentSource(customer, customerId),
      fraudAnalysis: {
        ...rest.fraudAnalysis,
        cart: { ...rest.fraudAnalysis?.cart, items: paymentMethod.items },
      },
    })
  }
}
