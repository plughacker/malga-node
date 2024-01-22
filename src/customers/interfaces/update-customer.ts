import { Customer } from './customers'

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
