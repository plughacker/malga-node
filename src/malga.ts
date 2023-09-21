import { Api } from './api'
import { Customers } from './customers'

import { MalgaConfigurations } from './malga.types'

export class Malga {
  readonly customers: Customers

  constructor(configurations: MalgaConfigurations) {
    const api = new Api(configurations)
    this.customers = new Customers(api)
  }
}
