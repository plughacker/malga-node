import { Api } from 'src/common/api'

import { ApiPostOptions } from 'src/common/interfaces'

import { ChargeCreateBuilder } from './builders'
import { Cards } from 'src/cards'
import { Customers } from 'src/customers'

import {
  ChargeSessionCreatePayload,
  ChargeCreatePayload,
  ChargeCreateResponse,
  ChargeFindResponse,
  ChargeListParams,
  ChargeListResponse,
  ChargeCapturePayload,
  ChargeCaptureResponse,
  ChargeRefundPayload,
  ChargeRefundResponse,
} from './interfaces'

export class Charges {
  constructor(
    private readonly api: Api,
    private readonly cards: Cards,
    private readonly customers: Customers,
  ) {}

  /**
   * Create a charge
   *
   * @link https://docs.malga.io/api#operation/charge
   *
   * @param payload - Charge object
   * @param options - API options like `idempotencyKey`
   * @returns Charge API response
   *
   * @example
   * Here is an example of how to create a charge
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * const charge = await malga.charges.create({
   *   merchantId: 'MERCHANT_ID',
   *   amount: 100,
   *   customer: {
   *     name: 'Homer Simpson',
   *     email: 'homer@simpsons.com',
   *     phoneNumber: '99999999999',
   *     document: {
   *       type: 'cpf',
   *       number: '99999999999',
   *       country: 'BR',
   *     },
   *     address: {
   *       street: 'Evergreen Terrace',
   *       streetNumber: '742',
   *       zipCode: '62629',
   *       country: 'US',
   *       state: 'Louisiana',
   *       city: 'Springfield',
   *       district: 'Suburb',
   *       complement: 'Residence'
   *     }
   *   },
   *   paymentMethod: {
   *     type: 'credit',
   *     card: {
   *       holderName: 'Homer Simpson',
   *       number: '5402502027127339'
   *       cvv: '391',
   *       expirationDate: '01/2025'
   *     }
   *   }
   * })
   * ```
   *
   * @example
   * Here is an example of how to create a charge with session
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * const charge = await malga.charges.create({
   *   sessionId: 'SESSION_ID',
   *   publicKey: 'PUBLIC_KEY'
   *   customerId: 'CUSTOMER_ID',
   *   paymentMethod: {
   *     type: 'credit',
   *     card: {
   *       holderName: 'Homer Simpson',
   *       number: '5402502027127339'
   *       cvv: '391',
   *       expirationDate: '01/2025'
   *     }
   *   }
   * })
   * ```
   */
  public async create(
    payload: ChargeCreatePayload,
    options?: ApiPostOptions,
  ): Promise<ChargeCreateResponse> {
    const chargeCreateBuilder = new ChargeCreateBuilder(
      this.cards,
      this.customers,
    )

    const sessionId = (payload as ChargeSessionCreatePayload)?.sessionId
    const publicKey =
      sessionId && (payload as ChargeSessionCreatePayload)?.publicKey

    const parsedPayload = await chargeCreateBuilder.payload(payload)

    return this.api.post(
      sessionId ? `/sessions/${sessionId}/charge` : '/charges',
      parsedPayload,
      options?.idempotencyKey,
      publicKey,
    )
  }

  /**
   * Find charge details
   *
   * @link https://docs.malga.io/api#operation/getChargesByid
   *
   * @param id - Charge ID
   * @returns Charge API response
   *
   * @example
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * const charge = await malga.charges.find('e917fc6d-c640-47a1-83eb-aa820dbd92fe')
   * ```
   */
  public async find(id: string): Promise<ChargeFindResponse> {
    return this.api.get(`/charges/${id}`)
  }

  /**
   * List the charges
   *
   * @link https://docs.malga.io/en/api#operation/getCharges
   *
   * @param params - Filter params
   * @returns Charge API response
   *
   * @example
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * const charges = await malga.charges.list({
   *   page: 1,
   *   limit: 15,
   *   sort: 'DESC'
   *   startDate: '2023-12-26T03:00:00.000Z',
   *   endDate: '2023-12-27T03:00:00.000Z',
   *   merchantId: '8fdff2ab-2bc4-436c-b9c4-8354bf20a62f',
   *   amount: 100,
   *   status: ['authorized'],
   *   paymentMethod: ['credit'],
   *   provider: ['PAGARME'],
   *   orderId: '41ee1393-05a8-46cb-9746-20d7ac58aa5f',
   *   hasSplit: false,
   *   sessionId: '6d0d866a-d28a-4f3d-8690-9d7ca89ebddb'
   * })
   * ```
   */
  public async list(params?: ChargeListParams): Promise<ChargeListResponse> {
    const parsedParams = {
      page: params?.page,
      limit: params?.limit,
      sort: params?.sort,
      originalAmount: params?.amount,
      splitRules: params?.hasSplit,
      paymentType: params?.paymentMethod?.join(),
      providerType: params?.provider?.join(),
      orderId: params?.orderId,
      sessionId: params?.sessionId,
      status: params?.status?.join(),
      merchantId: params?.merchantId,
      'created.gt': params?.startDate,
      'created.lt': params?.endDate,
    }

    return this.api.paginate('/charges', parsedParams)
  }

  /**
   * Capture pre-authorized charge
   *
   * @link https://docs.malga.io/en/api#operation/captureCharge
   *
   * @param id - Charge ID
   * @param payload - object with `amount` value
   * @param options - API options like `idempotencyKey`
   * @returns Charge API Response
   *
   * @example
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * await malga.charges.capture('575f9a3c-6e40-4077-852e-c6781dc3c7c7', {
   *   amount: 100
   * })
   * ```
   */
  public async capture(
    id: string,
    payload: ChargeCapturePayload,
    options?: ApiPostOptions,
  ): Promise<ChargeCaptureResponse> {
    return this.api.post(
      `/charges/${id}/capture`,
      payload,
      options?.idempotencyKey,
    )
  }

  /**
   * Refund authorized charge
   *
   * @link https://docs.malga.io/en/api#operation/refundCharge
   *
   * @param id - Charge ID
   * @param payload - object with `amount` value
   * @param options - API options like `idempotencyKey`
   * @returns Charge API Response
   *
   * @example
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * await malga.charges.refund('575f9a3c-6e40-4077-852e-c6781dc3c7c7', {
   *   amount: 100
   * })
   * ```
   */
  public async refund(
    id: string,
    payload: ChargeRefundPayload,
    options?: ApiPostOptions,
  ): Promise<ChargeRefundResponse> {
    return this.api.post(
      `/charges/${id}/void`,
      payload,
      options?.idempotencyKey,
    )
  }
}
