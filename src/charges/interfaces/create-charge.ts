import { Customer } from 'src/customers/interfaces/customers'
import { Charge, AppInfo, SplitRule } from './charges'

interface ChargePaymentMethodItem {
  id: string
  title: string
  unitPrice: number
  quantity: number
}

interface ChargePaymentMethodCard {
  linkCardToCustomer?: boolean
  tokenCvv?: string
  tokenId?: string
  cardCvv?: string
  cardId?: string
  card?: {
    holderName: string
    number: string
    cvv: string
    expirationDate: string
    zeroDollar?: {
      merchantId?: string
      cvvCheck?: boolean
    }
  }
}
export interface ChargePaymentMethodCredit extends ChargePaymentMethodCard {
  type: 'credit'
  installments: number
}

export interface ChargePaymentMethodVoucher extends ChargePaymentMethodCard {
  type: 'voucher'
  items?: ChargePaymentMethodItem[]
}

export interface ChargePaymentMethodPix {
  type: 'pix'
  expiresIn: number
  additionalInfo?: { name: string; value: string }[]
  items?: ChargePaymentMethodItem[]
}

export interface ChargePaymentMethodBoleto {
  type: 'boleto'
  expiresDate?: string
  instructions?: string
  interest?: {
    days: number
    percentage?: number
    amount?: number
  }
  fine?: {
    days: number
    percentage?: number
    amount?: number
  }
}

export interface ChargePaymentMethodDrip {
  type: 'drip'
  successRedirectUrl?: string
  cancelRedirectUrl?: string
  browser?: {
    ipAddress?: string
    browserFingerprint?: string
  }
  items?: ChargePaymentMethodItem[]
}

export interface ChargePaymentMethodNuPay {
  type: 'nupay'
  orderUrl?: string
  returnUrl?: string
  cancelUrl?: string
  taxValue?: number
  delayToAutoCancel?: number
  items: ChargeCreateFraudAnalysisItem[]
}

interface ChargeCreateFraudAnalysisAddress {
  street: string
  number: string
  zipCode: string
  country: string
  state: string
  city: string
  district: string
  complement?: string
}

interface ChargeCreateFraudAnalysisItem {
  name: string
  quantity: number
  sku: string
  unitPrice: number
  risk: 'Low' | 'High'
  description?: string
  categoryId?: string
  locality?: string
  date?: string
  type?: number
  genre?: string
  tickets?: {
    quantityTicketSale?: number
    quantityEventHouse?: number
    convenienceFeeValue?: number
    quantityFull?: number
    quantityHalf?: number
    batch?: number
  }
  location?: ChargeCreateFraudAnalysisAddress
}

interface ChargeCreateFraudAnalysis {
  sla?: number
  customer?: {
    name?: string
    email?: string
    phone?: string
    birthdate?: string
    identity?: string
    identityType?: string
    registrationDate?: string
    deliveryAddress?: ChargeCreateFraudAnalysisAddress
    billingAddress?: ChargeCreateFraudAnalysisAddress
    browser?: {
      browserFingerprint: string
      cookiesAccepted: boolean
      email: string
      hostName: string
      ipAddress: string
      type: string
    }
  }
  cart?: {
    items: ChargeCreateFraudAnalysisItem[]
  }
  device?: {
    os?: {
      type?: string
      version?: string
    }
    model?: string
    ramCapacity?: number
    diskCapacity?: number
    freeDiskSpace?: number
    resolution?: number
    vendors?: Record<string, any>[]
    vendorAttributes?: {
      flash?: boolean
      phoneCalls?: boolean
      sendSms?: boolean
      videoCamera?: boolean
      cpuCount?: boolean
      simulator?: boolean
      language?: string
      idiom?: string
      platform?: string
      name?: string
      family?: string
      retinaDisplay?: boolean
      camera?: boolean
      model?: string
      frontCamera?: boolean
    }
  }
}

interface ChargeCreateThreeDSecureAddress {
  street: string
  streetNumber: string
  zipCode: string
  country: string
  state: string
  city: string
}

export interface ChargeCreateThreeDSecure {
  redirectURL: string
  requestorURL: string
  browser: {
    acceptHeader: string
    colorDepth: number
    javaEnabled: boolean
    javaScriptEnabled: boolean
    language: string
    screenHeight: number
    screenWidth: number
    timeZoneOffset: string
    userAgent: string
    ip: string
  }
  billingAddress?: ChargeCreateThreeDSecureAddress
  shippingAddress?: ChargeCreateThreeDSecureAddress
  cardHolder?: {
    email: string
    mobilePhone?: string
  }
}

type ChargeCreatePaymentMethod =
  | ChargePaymentMethodCredit
  | ChargePaymentMethodPix
  | ChargePaymentMethodBoleto
  | ChargePaymentMethodDrip
  | ChargePaymentMethodNuPay
  | ChargePaymentMethodVoucher

interface ChargeCreatePaymentFlow {
  metadata: Record<string, any>
}

interface ChargeCommonCreatePayload {
  paymentMethod: ChargeCreatePaymentMethod
  fraudAnalysis?: ChargeCreateFraudAnalysis
  paymentFlow?: ChargeCreatePaymentFlow
  threeDSecure?: ChargeCreateThreeDSecure
  customer?: Customer
  customerId?: string
}

export interface ChargeSessionCreatePayload extends ChargeCommonCreatePayload {
  sessionId: string
  publicKey: string
  appInfo?: Omit<AppInfo, 'platform'>
}

interface ChargeDefaultCreatePayload extends ChargeCommonCreatePayload {
  amount: number
  orderId?: string
  currency?: string
  capture?: boolean
  merchantId: string
  description?: string
  statementDescriptor?: string
  splitRules?: SplitRule[]
  appInfo?: Omit<AppInfo, 'platform'>
}

export type ChargeCreatePayload =
  | ChargeDefaultCreatePayload
  | ChargeSessionCreatePayload

export interface ChargeCreateResponse extends Charge {}
