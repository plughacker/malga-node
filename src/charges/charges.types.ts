import { ApiPaginateParamsBase } from 'src/common/api'
import {
  ChargeStatus,
  ChargePaymentType,
  ChargeProvider,
} from 'src/common/interfaces/charges'

export interface ChargeListParams extends ApiPaginateParamsBase {
  startDate?: string
  endDate?: string
  merchantId?: string
  amount?: number
  status?: ChargeStatus[]
  paymentMethod?: ChargePaymentType[]
  provider?: ChargeProvider[]
  orderId?: string
  hasSplit?: boolean
  sessionId?: string
}

export interface ChargeCapturePayload {
  amount: number
}

export interface ChargeRefundPayload {
  amount: number
  delayToCompose?: number
}
