import { BaseHandler } from '../base'

import { Customer } from 'src/common/interfaces/customer'
import { ChargePaymentMethodPix } from 'src/charges/charges.types'

import { PixHandlerPayload } from './pix.types'

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
      sourceType: this.parsePaymentSource(customer, customerId),
    })
  }
}
