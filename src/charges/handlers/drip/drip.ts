import { BaseHandler } from '../base'

import { Customer } from 'src/common/interfaces/customer'
import { ChargePaymentMethodDrip } from 'src/charges/charges.types'

import { DripHandlerPayload } from './drip.types'

export class DripHandler extends BaseHandler {
  private parsePaymentMethod(paymentMethod: ChargePaymentMethodDrip) {
    const { type, ...rest } = paymentMethod

    return {
      paymentType: 'drip',
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

  public handle(payload: DripHandlerPayload) {
    // Call next handler because paymentMethod has already been parsed
    if (payload.paymentMethod?.type !== 'drip') {
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
