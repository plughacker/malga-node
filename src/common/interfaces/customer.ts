export interface Customer {
  name: string
  email: string
  phoneNumber: string
  document: {
    type: string
    number: string
    country?: string
  }
  address?: {
    street: string
    streetNumber: string
    zipCode: string
    country: string
    state: string
    city: string
    district: string
    complement?: string
  }
}
