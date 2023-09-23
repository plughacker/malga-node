interface SessionItem {
  name: string
  unitPrice: number
  quantity: number
  description?: string
  tangible?: boolean
}

interface SessionPix {
  paymentType: 'pix'
  expiresIn: number
}

interface SessionBoleto {
  paymentType: 'boleto'
  expiresDate: string
  instructions?: string
  interest?: {
    days: number
    amount?: number
    percentage?: number
  }
  fine?: {
    days: number
    amount?: number
    percentage?: number
  }
}

interface SessionCredit {
  paymentType: 'credit'
  installments?: number
}

interface SessionDrip {
  paymentType: 'drip'
  successRedirectUrl?: string
  cancelRedirectUrl?: string
}

export interface Session {
  merchantId: string
  amount: number
  dueDate: string
  name: string
  paymentMethods: (SessionCredit | SessionPix | SessionBoleto | SessionDrip)[]
  items: SessionItem[]
  description?: string
  statementDescriptor?: string
  createLink?: boolean
  orderId?: string
  currency?: string
  isActive?: boolean
  capture?: boolean
}
