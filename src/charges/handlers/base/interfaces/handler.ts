export interface Handler {
  setNext(handler: Handler): Handler

  handle(payload: unknown): unknown
}
