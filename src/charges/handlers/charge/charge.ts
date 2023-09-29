import { BaseHandler } from '../base'

import { ChargeHandlerPayload } from './charge.types'

export class ChargeHandler extends BaseHandler {
  public handle(payload: ChargeHandlerPayload) {
    const { threeDSecure, ...rest } = payload
    const threeDSecure2 = payload?.threeDSecure && {
      threeDSecure2: threeDSecure,
    }

    const charge = {
      ...rest,
      ...threeDSecure2,
    }

    return super.handle(charge)
  }
}
