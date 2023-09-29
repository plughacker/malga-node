import {
  ApiPaginateParamsBase,
  ApiPaginateResponse,
} from 'src/common/interfaces'
import {
  Charge,
  ChargePaymentType,
  ChargeProvider,
  ChargeStatusTypes,
} from './charges'

export interface ChargeListParams extends ApiPaginateParamsBase {
  startDate?: string
  endDate?: string
  merchantId?: string
  amount?: number
  status?: ChargeStatusTypes[]
  paymentMethod?: ChargePaymentType[]
  provider?: ChargeProvider[]
  orderId?: string
  hasSplit?: boolean
  sessionId?: string
}

export type ChargeListResponse = ApiPaginateResponse<Charge>
