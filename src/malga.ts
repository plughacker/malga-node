import { Api } from './api'
import { Auth } from './auth'
import { Customers } from './customers'
import { Webhooks } from './webhooks'

import { MalgaConfigurations } from './malga.types'

export class Malga {
  readonly customers: Customers
  readonly auth: Auth
  readonly webhooks: Webhooks

  constructor(configurations: MalgaConfigurations) {
    const api = new Api(configurations)
    this.customers = new Customers(api)
    this.auth = new Auth(api)
    this.webhooks = new Webhooks()
  }
}
