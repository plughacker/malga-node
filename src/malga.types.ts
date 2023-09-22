export interface MalgaConfigurations {
  apiKey: string
  clientId: string
  options?: {
    sandbox?: boolean
    http?: { retries?: number; retryDelay?: number }
  }
}

type MalgaErrorType =
  | 'api_error'
  | 'bad_request'
  | 'invalid_request_error'
  | 'card_declined'

type MalgaErrorDeclinedCode =
  | 'card_not_supported'
  | 'expired_card'
  | 'fraud_confirmed'
  | 'fraud_suspect'
  | 'generic'
  | 'insufficient_funds'
  | 'invalid_amount'
  | 'invalid_cvv'
  | 'invalid_data'
  | 'invalid_installment'
  | 'invalid_merchant'
  | 'invalid_number'
  | 'invalid_pin'
  | 'issuer_not_available'
  | 'lost_card'
  | 'not_permitted'
  | 'pickup_card'
  | 'pin_try_exceeded'
  | 'restricted_card'
  | 'security_violation'
  | 'service_not_allowed'
  | 'stolen_card'
  | 'transaction_not_allowed'
  | 'try_again'

export interface MalgaErrorResponse {
  error: {
    type: MalgaErrorType
    code: number
    message: string
    details?: string | string[]
    declinedCode?: MalgaErrorDeclinedCode
  }
}

export enum MalgaPaginateSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum MalgaAuthScope {
  Customers = 'customers',
  Cards = 'cards',
  Tokens = 'tokens',
  Charges = 'charges',
  Webhooks = 'webhooks',
  Sessions = 'sessions',
  Auth = 'auth',
  Reports = 'reports',
  Flows = 'flows',
  Sellers = 'sellers',
}

export enum MalgaChargeStatus {
  Pending = 'pending',
  PreAuthorized = 'pre_authorized',
  Authorized = 'authorized',
  Failed = 'failed',
  Canceled = 'canceled',
  Voided = 'voided',
  ChargedBack = 'charged_back',
  CapturePending = 'capture_pending',
  RefundPending = 'refund_pending',
  Created = 'created',
}
