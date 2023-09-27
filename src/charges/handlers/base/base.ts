import { Handler } from './base.types'

export abstract class BaseHandler implements Handler {
  private nextHandler: Handler | null = null

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  public handle(payload: unknown) {
    if (this.nextHandler) {
      return this.nextHandler.handle(payload)
    }

    return payload
  }
}
