import {
  ApiPaginateParamsBase,
  ApiPaginateResponse,
} from 'src/common/interfaces'
import { CustomerResponse } from './customers'

export interface CustomerListParams extends ApiPaginateParamsBase {
  documentType?: string
  documentNumber?: string
}

export type CustomerListResponse = ApiPaginateResponse<CustomerResponse>
