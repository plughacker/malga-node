import { Api } from './api'
import { Auth } from './auth'
import { Customers } from './customers'
import { Sellers } from './sellers'
import { Webhooks } from './webhooks'

import { MalgaConfigurations } from './malga.types'
import { Sandbox } from './sandbox'

export class Malga {
  readonly auth: Auth
  readonly customers: Customers
  readonly sandbox: Sandbox
  readonly sellers: Sellers
  readonly webhooks: Webhooks

  constructor(configurations: MalgaConfigurations) {
    const api = new Api(configurations)
    this.auth = new Auth(api)
    this.customers = new Customers(api)
    this.sandbox = new Sandbox(api, !!configurations.options?.sandbox)
    this.sellers = new Sellers(api)
    this.webhooks = new Webhooks()
  }
}
