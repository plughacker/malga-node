import { Auth } from './auth'
import { Customers } from './customers'
import { Sellers } from './sellers'
import { Sessions } from './sessions'
import { Webhooks } from './webhooks'
import { Sandbox } from './sandbox'
import { Cards } from './cards'
import { Charges } from './charges'

import { Api } from './common/api'
import { MalgaConfigurations } from './common/interfaces/malga'

export class Malga {
  readonly auth: Auth
  readonly cards: Cards
  readonly charges: Charges
  readonly customers: Customers
  readonly sandbox: Sandbox
  readonly sellers: Sellers
  readonly sessions: Sessions
  readonly webhooks: Webhooks

  constructor(configurations: MalgaConfigurations) {
    if (!configurations.apiKey || !configurations.clientId) {
      throw new Error(
        'Missing API key. Pass it to the constructor `new Malga({ apiKey: "YOUR_API_KEY", clientId: "YOUR_CLIENT_ID" })`',
      )
    }

    const api = new Api(configurations)
    this.auth = new Auth(api)
    this.cards = new Cards(api)
    this.customers = new Customers(api)
    this.sandbox = new Sandbox(api, !!configurations.options?.sandbox)
    this.sellers = new Sellers(api)
    this.sessions = new Sessions(api)
    this.webhooks = new Webhooks()
    this.charges = new Charges(api, this.cards, this.customers)
  }
}
