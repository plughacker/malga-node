import { Customer } from './customer'

export type ChargeStatus =
  | 'pending'
  | 'pre_authorized'
  | 'authorized'
  | 'failed'
  | 'canceled'
  | 'voided'
  | 'charged_back'
  | 'capture_pending'
  | 'refund_pending'
  | 'created'

interface SplitRule {
  sellerId: string
  percentage: number
  amount: number
  processingFee: boolean
  liable: boolean
}

interface ChargePaymentMethodCard {
  paymentType: 'credit'
  installments?: number
}

interface ChargePaymentMethodPix {
  paymentType: 'pix'
  expiresIn: number
  qrCodeData: string
  qrCodeImageUrl: string
}

interface ChargePaymentMethodBoleto {
  paymentType: 'boleto'
  expiresDate: string
  barcodeData: string
  barcodeImageUrl: string
}

interface ChargePaymentMethodNupay {
  paymentType: 'nupay'
  delayToAutoCancel: number
  orderUrl?: string
  taxValue?: number
}

interface ChargePaymentMethodVoucher {
  paymentType: 'voucher'
}

interface ChargePaymentMethodDrip {
  paymentType: 'drip'
  paymentUrl: string
}

type ChargePaymentMethod =
  | ChargePaymentMethodPix
  | ChargePaymentMethodBoleto
  | ChargePaymentMethodCard
  | ChargePaymentMethodNupay
  | ChargePaymentMethodVoucher
  | ChargePaymentMethodDrip

interface ChargePaymentSourceCard {
  sourceType: 'card'
  cardId: string
  cardCvv?: string
}

interface ChargePaymentSourceCardOneShot {
  sourceType: 'card'
  card: {
    cardHolderName: string
    cardNumber: string
    cardCvv: string
    cardExpirationDate: string
  }
}

interface ChargePaymentSourceToken {
  sourceType: 'token'
  tokenId: string
}

interface ChargePaymentSourceCustomer {
  sourceType: 'customer'
  customerId: string
}

interface ChargePaymentSourceCustomerOneShot {
  sourceType: 'customer'
  customer?: Customer
}

type ChargePaymentSource =
  | ChargePaymentSourceCard
  | ChargePaymentSourceCardOneShot
  | ChargePaymentSourceToken
  | ChargePaymentSourceCustomer
  | ChargePaymentSourceCustomerOneShot

type Provider =
  | 'BS2'
  | 'BS2_BOLETO'
  | 'BB'
  | 'CIELO'
  | 'MERCADO_PAGO'
  | 'PAGARME'
  | 'REDE'
  | 'PLUG_SANDBOX'
  | 'SANDBOX'
  | 'STRIPE'
  | 'ZOOP'
  | 'PAGSEGURO'
  | 'BRAINTREE'
  | 'CLEARSALE'
  | 'NUPAY'
  | 'ADYEN'
  | 'KLAP'
  | 'GETNET'
  | 'BRASPAG'
  | 'VR'
  | 'DRIP'
  | 'SANDBOX_ANTIFRAUD'

type ChargeRequestStatus =
  | 'running'
  | 'failed'
  | 'success'
  | 'timeout'
  | 'internal_error'
  | 'processing'

type ChargeRequestType =
  | 'pending'
  | 'authorization'
  | 'pre_authorization'
  | 'void'
  | 'capture'
  | 'probe'
  | 'charge_back'
  | 'zero_dollar'
  | 'capture_pending'
  | 'refund_pending'
  | 'anti_fraud'
  | 'dispute'
  | 'dispute_closed'
  | 'anti_fraud_feeding'

interface ChargeProviderError {
  message: string
  declinedCode: string
  retryable: boolean
  networkDeniedReason: string
  networkDeniedMessage: string
}

interface ChargeProviderAuthorization {
  networkAuthorizationCode: string
  networkResponseCode: string
}

interface ChargeFraudAnalysis {
  status: string
  score: number
}

interface ChargeTransactionRequest {
  id: string
  createdAt: string
  updatedAt: string
  idempotencyKey: string
  providerId: string
  providerType: Provider | null
  transactionId: string | null
  amount: number
  authorizationCode: string
  authorizationNsu: string
  requestStatus: ChargeRequestStatus
  requestType: ChargeRequestType
  responseTs: string
  providerError?: ChargeProviderError
  providerAuthorization?: ChargeProviderAuthorization
  fraudAnalysis?: ChargeFraudAnalysis
}

interface AppInfoPlatform {
  integrator: string
  name: string
  version: string
}

interface AppInfoBase {
  name: string
  version: string
}

interface AppInfo {
  platform?: AppInfoPlatform
  device?: AppInfoBase
  system?: AppInfoBase
}

export interface Charge {
  id: string
  clientId: string
  merchantId: string
  customerId?: string
  description: string | null
  orderId: string | null
  createdAt: string
  amount: number
  originalAmount: number
  currency: string
  statementDescriptor: string | null
  capture: boolean
  status: ChargeStatus
  paymentMethod: ChargePaymentMethod
  paymentSource: ChargePaymentSource
  transactionRequests: ChargeTransactionRequest[]
  splitRules?: SplitRule[]
  appInfo: AppInfo | null
}
