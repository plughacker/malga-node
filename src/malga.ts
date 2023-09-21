import { Api } from './api'
import { Auth } from './auth'
import { Customers } from './customers'

import { MalgaConfigurations } from './malga.types'

export class Malga {
  readonly customers: Customers
  readonly auth: Auth

  constructor(configurations: MalgaConfigurations) {
    const api = new Api(configurations)
    this.customers = new Customers(api)
    this.auth = new Auth(api)
  }
}
