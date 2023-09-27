import { ChargeCreateFraudAnalysis } from 'src/charges/charges.types'
import { BaseHandler } from '../base'

import { ChargeHandlerPayload } from './charge.types'

export class ChargeHandler extends BaseHandler {
  private parseFraudAnalysis(fraudAnalysis?: ChargeCreateFraudAnalysis) {
    if (fraudAnalysis?.customer) {
      return {
        ...fraudAnalysis,
        customer: {
          name: fraudAnalysis?.customer.name,
          email: fraudAnalysis?.customer.email,
          phone: fraudAnalysis?.customer.phoneNumber,
          identityType: fraudAnalysis?.customer.document.type,
          identity: fraudAnalysis?.customer.document.number,
          registrationDate: fraudAnalysis?.customer.registrationDate,
          browser: fraudAnalysis?.customer.browser,
          billingAddress: {
            country: fraudAnalysis.customer.billingAddress.country,
            state: fraudAnalysis.customer.billingAddress.state,
            city: fraudAnalysis.customer.billingAddress.city,
            district: fraudAnalysis.customer.billingAddress.district,
            zipCode: fraudAnalysis.customer.billingAddress.zipCode,
            street: fraudAnalysis.customer.billingAddress.street,
            number: fraudAnalysis.customer.billingAddress.streetNumber,
            complement: fraudAnalysis.customer.billingAddress.complement,
          },
          deliveryAddress: {
            country: fraudAnalysis.customer.deliveryAddress.country,
            state: fraudAnalysis.customer.deliveryAddress.state,
            city: fraudAnalysis.customer.deliveryAddress.city,
            district: fraudAnalysis.customer.deliveryAddress.district,
            zipCode: fraudAnalysis.customer.deliveryAddress.zipCode,
            street: fraudAnalysis.customer.deliveryAddress.street,
            number: fraudAnalysis.customer.deliveryAddress.streetNumber,
            complement: fraudAnalysis.customer.deliveryAddress.complement,
          },
        },
      }
    }

    return fraudAnalysis
  }

  public handle(payload: ChargeHandlerPayload) {
    const { threeDSecure, ...rest } = payload

    const fraudAnalysis =
      payload?.fraudAnalysis && this.parseFraudAnalysis(payload.fraudAnalysis)
    const threeDSecure2 = payload?.threeDSecure && {
      threeDSecure2: threeDSecure,
    }

    const charge = {
      ...rest,
      ...fraudAnalysis,
      ...threeDSecure2,
    }

    return super.handle(charge)
  }
}
