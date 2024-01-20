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
  installments: number
}

interface SessionDrip {
  paymentType: 'drip'
  successRedirectUrl?: string
  cancelRedirectUrl?: string
}

interface SessionNuPay {
  paymentType: 'nupay'
  orderUrl?: string
  returnUrl?: string
  cancelUrl?: string
  taxValue?: number
  delayToAutoCancel?: number
}

export interface Session {
  merchantId: string
  amount: number
  dueDate: string
  name: string
  paymentMethods: (
    | SessionCredit
    | SessionPix
    | SessionBoleto
    | SessionDrip
    | SessionNuPay
  )[]
  items: SessionItem[]
  description?: string
  statementDescriptor?: string
  createLink?: boolean
  orderId?: string
  currency?: string
  isActive?: boolean
  capture?: boolean
}

export interface SessionResponse extends Omit<Session, 'createLink'> {
  createdAt: string
  updatedAt: string
  id: string
  publicKey: string
  paymentLink: string
  status: SessionStatus
}

export type SessionStatus = 'created' | 'paid' | 'canceled' | 'voided'
