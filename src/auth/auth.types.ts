type AuthScopeTypes =
  | 'customers'
  | 'cards'
  | 'tokens'
  | 'charges'
  | 'webhooks'
  | 'sessions'
  | 'auth'
  | 'reports'
  | 'flows'
  | 'sellers'

type AuthScop = '*' | AuthScopeTypes[]

export interface AuthCreatePublicKeyPayload {
  scope: AuthScop
  expires: number
}

export interface AuthCreatePublicKeyResponse {
  publicKey: string
  createdAt: string
  clientId: string
  expires: string
  scope: AuthScop
}
