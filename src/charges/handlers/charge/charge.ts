import { version } from '../../../../package.json'

import { BaseHandler } from '../base'

import { ChargeHandlerPayload } from './interfaces'

export class ChargeHandler extends BaseHandler {
  public handle(payload: ChargeHandlerPayload) {
    const { threeDSecure, ...rest } = payload
    const threeDSecure2 = payload?.threeDSecure && {
      threeDSecure2: threeDSecure,
    }

    const charge = {
      ...rest,
      ...threeDSecure2,
      appInfo: {
        ...rest.appInfo,
        platform: {
          name: 'Node.js SDK',
          integrator: 'Malga',
          version,
        },
      },
    }

    return super.handle(charge)
  }
}
