import { ApiPaginateParamsBase, ApiPostOptions } from 'src/common/api'
import { Customer } from 'src/common/interfaces/customer'

export interface CustomerCreateResponse extends Customer {
  id: string
  createdAt: string
}

export interface CustomerCreateOptions extends ApiPostOptions {
  force?: boolean
}

export type CustomerUpdatePayload = Omit<Customer, 'document' | 'email'>

export interface CustomerUpdateResponse {
  id: string
  updatedAt: string
  createdAt: string
  idempotencyKey: string | null
  requestId: string | null
  clientId: string
  cardId: string | null
  name: string
  email: string
  phoneNumber: string
  documentNumber: string
  documentType: string
  documentCountry: string | null
  address: {
    country: string
    id: string
    updatedAt: string
    createdAt: string
    idempotencyKey: string | null
    requestId: string | null
    street: string
    streetNumber: string
    complement: string | null
    zipCode: string
    state: string
    city: string
    district: string
    deletedAt: string | null
  }
}

export interface CustomerListParams extends ApiPaginateParamsBase {
  documentType?: string
  documentNumber?: string
}

export interface CustomerCardsResponse {
  id: string
  status: 'failed' | 'active' | 'pending'
  createdAt: string
  clientId: string
  customerId: string
  brand: 'Mastercard'
  cardHolderName: string
  cvvChecked: boolean
  fingerprint: string | null
  first6digits: string
  last4digits: string
  expirationMonth: string
  expirationYear: string
}

export interface CustomerLinkCardPayload {
  cardId: string
}
