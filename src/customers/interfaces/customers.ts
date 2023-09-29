interface CustomerDocument {
  type: string
  number: string
  country?: string
}

interface CustomerAddress {
  street: string
  streetNumber: string
  zipCode: string
  country: string
  state: string
  city: string
  district: string
  complement?: string
}

export interface Customer {
  name: string
  email: string
  phoneNumber: string
  document: CustomerDocument
  address?: CustomerAddress
}

export interface CustomerResponse extends Customer {
  id: string
  createdAt: string
}
