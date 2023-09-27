import { BaseHandler } from '../base'

import { Cards } from 'src/cards'
import { Customers } from 'src/customers'

import { ChargePaymentMethodVoucher } from 'src/charges/charges.types'

import { VoucherHandlerPayload } from './voucher.types'
import { Customer } from 'src/common/interfaces/customer'

export class VoucherHandler extends BaseHandler {
  constructor(
    private readonly cards: Cards,
    private readonly customers: Customers,
  ) {
    super()
  }

  private async parseCustomer(customer?: Customer, customerId?: string) {
    if (!customer && !customerId) return null

    if (customer) {
      const { id } = await this.customers.create(customer)
      return id
    }

    return customerId
  }

  private parsePaymentMethod(paymentMethod: ChargePaymentMethodVoucher) {
    const {
      type,
      card,
      cardCvv,
      cardId,
      linkCardToCustomer,
      tokenCvv,
      tokenId,
      ...rest
    } = paymentMethod

    return {
      paymentType: 'voucher',
      ...rest,
    }
  }

  private async parsePaymentSource(
    paymentMethod: ChargePaymentMethodVoucher,
    customerId?: string | null,
  ) {
    if (
      !paymentMethod.tokenId &&
      !paymentMethod.cardId &&
      !paymentMethod.card
    ) {
      return null
    }

    if (paymentMethod.card) {
      const { tokenId } = await this.cards.tokenization({
        holderName: paymentMethod.card!.holderName,
        number: paymentMethod.card!.number,
        cvv: paymentMethod.card!.cvv,
        expirationDate: paymentMethod.card!.expirationDate,
      })

      if (paymentMethod.card?.zeroDollar) {
        const { id } = await this.cards.create({
          tokenId,
          zeroDollar: paymentMethod.card?.zeroDollar,
        })

        if (customerId && paymentMethod.linkCardToCustomer) {
          await this.customers.linkCard(customerId, {
            cardId: id,
          })
        }

        return {
          sourceType: 'card',
          cardId: id,
        }
      }

      return {
        sourceType: 'token',
        tokenId,
      }
    }

    if (paymentMethod.cardId) {
      const tokenCvv = paymentMethod.tokenCvv && {
        tokenCvv: paymentMethod.tokenCvv,
      }
      const cardCvv = paymentMethod.cardCvv && {
        cardCvv: paymentMethod.cardCvv,
      }

      if (customerId && paymentMethod.linkCardToCustomer) {
        await this.customers.linkCard(customerId, {
          cardId: paymentMethod.cardId,
        })
      }

      return {
        sourceType: 'card',
        cardId: paymentMethod.cardId,
        ...tokenCvv,
        ...cardCvv,
      }
    }

    return {
      sourceType: 'token',
      tokenId: paymentMethod.tokenId,
    }
  }

  public async handle(payload: VoucherHandlerPayload) {
    // Call next handler because paymentMethod has already been parsed
    if (payload.paymentMethod?.type !== 'voucher') {
      return super.handle(payload)
    }

    const { paymentMethod, customer, customerId, ...rest } = payload

    const currentCustomerId = await this.parseCustomer(customer, customerId)

    return super.handle({
      ...rest,
      customerId: currentCustomerId,
      paymentMethod: this.parsePaymentMethod(paymentMethod),
      sourceType: await this.parsePaymentSource(paymentMethod),
    })
  }
}
