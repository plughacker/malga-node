export interface ApiPostOptions {
  idempotencyKey?: string
}

type ApiPaginateSort = 'ASC' | 'DESC'

export interface ApiPaginateParamsBase {
  page?: number
  limit?: number
  sort?: ApiPaginateSort
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
