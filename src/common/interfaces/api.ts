export interface ApiPostOptions {
  idempotencyKey?: string
}

type ApiPaginateSortTypes = 'ASC' | 'DESC'

export enum ApiPaginateSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ApiPaginateParamsBase {
  page?: number
  limit?: number
  sort?: ApiPaginateSortTypes
}

export interface ApiPaginateResponse<T> {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}
