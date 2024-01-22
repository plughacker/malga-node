import { ChargeHandlerResponse } from '../../charge'

export type SessionHandlerPayload = ChargeHandlerResponse

export type SessionHandlerResponse = Omit<ChargeHandlerResponse, 'sessionId'>
