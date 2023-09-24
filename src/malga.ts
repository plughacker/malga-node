import { Api } from './common/api'
import { Auth } from './auth'
import { Customers } from './customers'
import { Sellers } from './sellers'
import { Sessions } from './sessions'
import { Webhooks } from './webhooks'

import { MalgaConfigurations } from './malga.types'
import { Sandbox } from './sandbox'
import { Cards } from './cards'

export class Malga {
  readonly auth: Auth
  readonly cards: Cards
  readonly customers: Customers
  readonly sandbox: Sandbox
  readonly sellers: Sellers
  readonly sessions: Sessions
  readonly webhooks: Webhooks

  constructor(configurations: MalgaConfigurations) {
    const api = new Api(configurations)
    this.auth = new Auth(api)
    this.customers = new Customers(api)
    this.sandbox = new Sandbox(api, !!configurations.options?.sandbox)
    this.sellers = new Sellers(api)
    this.sessions = new Sessions(api)
    this.webhooks = new Webhooks()
    this.cards = new Cards(api)
  }
}
