import { ChargeSessionCreatePayload } from 'src/charges/interfaces/create-charge'
import { BaseHandler } from '../base'

import { SessionHandlerPayload } from './interfaces'

export class SessionHandler extends BaseHandler {
  public handle(payload: SessionHandlerPayload) {
    if ((payload as ChargeSessionCreatePayload)?.sessionId) {
      const { sessionId, publicKey, appInfo, ...rest } =
        payload as ChargeSessionCreatePayload

      return super.handle(rest)
    }

    return super.handle(payload)
  }
}
