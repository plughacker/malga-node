export type SellerStatus = 'active' | 'pending' | 'inactive'

interface SellerProvider {
  providerType: string
  externalId: string
  externalStatus: string
  externalStatusReason: string
  status: string
}

interface SellerOwner {
  name: string
  email: string
  phoneNumber: string
  birthdate: string
  document: {
    type: string
    number: string
    country?: string
  }
  address: {
    street: string
    streetNumber: string
    zipCode: string
    country: string
    state: string
    city: string
    district: string
    referencePoint?: string
    complement?: string
  }
}

interface SellerBusiness extends Omit<SellerOwner, 'birthdate'> {
  website?: string
  facebook?: string
  twitter?: string
  description: string
  openingDate: string
  annualRevenue?: number
}

export interface Seller {
  merchantId?: string
  minNegativeBalance?: number
  owner?: SellerOwner
  business?: SellerBusiness
  mcc: number
  bankAccount: {
    holderName: string
    holderDocument: string
    bank: string
    branchNumber: string
    branchCheckDigit?: string
    accountNumber: string
    accountCheckDigit: string
    pixKey?: string
    type:
      | 'conta_corrente'
      | 'conta_poupanca'
      | 'conta_corrente_conjunta'
      | 'conta_poupanca_conjunta'
  }
  transferPolicy: {
    transferDay: number
    transferEnabled: boolean
    transferInterval: 'daily' | 'weekly' | 'monthly'
    automaticAnticipationEnabled?: boolean
    anticipatableVolumePercentage?: string
    automaticAnticipationType?: string
    automaticAnticipationDays?: string
    automaticAnticipation1025Delay?: string
  }
  metadata?: Record<string, string>[]
}

export interface SellerResponse extends Seller {
  id: string
  clientId: string
  status: SellerStatus
  providers: SellerProvider[]
}
