import { ApiPostOptions } from 'src/common/interfaces'
import { Customer, CustomerResponse } from './customers'

export interface CustomerCreatePayload extends Customer {}

export interface CustomerCreateResponse extends CustomerResponse {}

export interface CustomerCreateOptions extends ApiPostOptions {
  force?: boolean
}
