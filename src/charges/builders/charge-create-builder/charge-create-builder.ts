import { Cards } from 'src/cards'
import { Customers } from 'src/customers'

import {
  ChargeCreatePayload,
  ChargeSessionCreatePayload,
} from 'src/charges/interfaces'

import {
  ChargeHandler,
  CreditHandler,
  BoletoHandler,
  PixHandler,
  DripHandler,
  NuPayHandler,
  VoucherHandler,
  SessionHandler,
} from '../../handlers'

export class ChargeCreateBuilder {
  constructor(
    private readonly cards: Cards,
    private readonly customers: Customers,
  ) {}

  public async payload(
    payload: ChargeCreatePayload | ChargeSessionCreatePayload,
  ) {
    const chargeHandler = new ChargeHandler()
    const creditHandler = new CreditHandler(this.cards, this.customers)
    const pixHandler = new PixHandler()
    const boletoHandler = new BoletoHandler()
    const dripHandler = new DripHandler()
    const nupayHandler = new NuPayHandler()
    const voucherHandler = new VoucherHandler(this.cards, this.customers)
    const sessionHandler = new SessionHandler()

    chargeHandler
      .setNext(creditHandler)
      .setNext(pixHandler)
      .setNext(boletoHandler)
      .setNext(dripHandler)
      .setNext(nupayHandler)
      .setNext(voucherHandler)
      .setNext(sessionHandler)

    return chargeHandler.handle(payload)
  }
}
