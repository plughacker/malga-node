import {
  ApiPaginateParamsBase,
  ApiPaginateResponse,
} from 'src/common/interfaces'

import { CardResponse } from './cards'

export type CardListResponse = ApiPaginateResponse<
  Omit<CardResponse, 'deletedAt' | 'deletedReason' | 'statusReason'>
>

export type CardListParams = Omit<ApiPaginateParamsBase, 'sort'>
