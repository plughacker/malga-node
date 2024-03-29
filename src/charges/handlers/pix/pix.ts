import { BaseHandler } from '../base'

import { Customer } from 'src/customers/interfaces/customers'
import { ChargePaymentMethodPix } from 'src/charges/interfaces/create-charge'

import { PixHandlerPayload } from './interfaces'

export class PixHandler extends BaseHandler {
  private parsePaymentMethod(paymentMethod: ChargePaymentMethodPix) {
    const { type, ...rest } = paymentMethod

    return {
      paymentType: 'pix',
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

  public handle(payload: PixHandlerPayload) {
    // Call next handler because paymentMethod has already been parsed
    if (payload.paymentMethod?.type !== 'pix') {
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
