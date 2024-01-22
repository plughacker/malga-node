import {
  ApiPaginateParamsBase,
  ApiPaginateResponse,
} from 'src/common/interfaces'

import { SellerStatus, SellerResponse } from './sellers'

export interface SellerListParams extends ApiPaginateParamsBase {
  email?: string
  status?: SellerStatus[]
}

export type SellerListResponse = ApiPaginateResponse<SellerResponse>
