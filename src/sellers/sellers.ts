import { Api, ApiPaginateResponse, ApiPostOptions } from 'src/api'

import {
  Seller,
  SellerListParams,
  SellerRemovePayload,
  SellerResponse,
} from './sellers.types'

export class Sellers {
  constructor(private readonly api: Api) {}

  /**
   * Create a seller
   *
   * @link https://docs.malga.io/api#operation/postSeller
   *
   * @param payload - Seller object
   * @param options - API options like `idempotencyKey`
   * @returns Seller API response
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
   * const seller = await malga.sellers.create({
   *   merchantId: 'aa2ec134-6164-4b5b-a7e2-85daefec318d',
   *   mcc: 1,
   *   owner: {
   *     name: 'Homer Simpson',
   *     email: 'homer@simpsons.com',
   *     phoneNumber: '99999999999',
   *     birthdate: '1989-12-17',
   *     document: {
   *       type: 'cpf',
   *       number: '99999999999',
   *       country: 'BR',
   *     },
   *     address: {
   *      street: 'Evergreen Terrace',
   *      streetNumber: '742',
   *      zipCode: '62629',
   *      country: 'US',
   *      state: 'Louisiana',
   *      city: 'Springfield',
   *      district: 'Suburb',
   *      complement: 'Residence',
   *     },
   *   },
   *   bankAccount: {
   *     holderName: 'Homer Simpson',
   *     holderDocument: '99999999999',
   *     bank: '077',
   *     branchNumber: '492',
   *     branchCheckDigit: '1',
   *     accountNumber: '4929',
   *     accountCheckDigit: '22',
   *     type: 'conta_corrente',
   *   },
   *   transferPolicy: {
   *     transferDay: 5,
   *     transferEnabled: true,
   *     transferInterval: 'weekly',
   *     automaticAnticipationEnabled: false,
   *   },
   *   metadata: [{
   *     key: '768093',
   *     value: 'Additional information',
   *   }],
   * })
   * ```
   */
  public async create(
    payload: Seller,
    options?: ApiPostOptions,
  ): Promise<SellerResponse> {
    return this.api.post('/sellers', payload, options?.idempotencyKey)
  }

  /**
   * Find seller details
   *
   * @link https://docs.malga.io/api#operation/getSellerById
   *
   * @param id - Seller ID
   * @returns Seller API response
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
   * const seller = await malga.sellers.find('e917fc6d-c640-47a1-83eb-aa820dbd92fe')
   * ```
   */
  public async find(id: string): Promise<SellerResponse> {
    return this.api.get(`/sellers/${id}`)
  }

  /**
   * List the sellers
   *
   * @link https://docs.malga.io/api#operation/getSellerPaginate
   *
   * @param params - Filter params
   * @returns Seller API response
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
   * const sellers = await malga.sellers.list({ page: 1, limit: 15 })
   * ```
   */
  public async list(
    params?: SellerListParams,
  ): Promise<ApiPaginateResponse<SellerResponse>> {
    return this.api.paginate('/sellers', params)
  }

  /**
   * Update the seller
   *
   * @link https://docs.malga.io/api#operation/updateSellerById
   *
   * @param id - Seller ID
   * @param payload - Updated seller object
   * @returns Seller API response
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
   * const seller = await malga.sellers.update('575f9a3c-6e40-4077-852e-c6781dc3c7c7', {
   *   merchantId: 'aa2ec134-6164-4b5b-a7e2-85daefec318d',
   *   mcc: 1,
   *   owner: {
   *     name: 'Homer Simpson',
   *     email: 'homer@simpsons.com',
   *     phoneNumber: '99999999999',
   *     birthdate: '1989-12-17',
   *     document: {
   *       type: 'cpf',
   *       number: '99999999999',
   *       country: 'BR',
   *     },
   *     address: {
   *      street: 'Evergreen Terrace',
   *      streetNumber: '742',
   *      zipCode: '62629',
   *      country: 'US',
   *      state: 'Louisiana',
   *      city: 'Springfield',
   *      district: 'Suburb',
   *      complement: 'Residence',
   *     },
   *   },
   *   bankAccount: {
   *     holderName: 'Homer Simpson',
   *     holderDocument: '99999999999',
   *     bank: '077',
   *     branchNumber: '492',
   *     branchCheckDigit: '1',
   *     accountNumber: '4929',
   *     accountCheckDigit: '22',
   *     type: 'conta_corrente',
   *   },
   *   transferPolicy: {
   *     transferDay: 5,
   *     transferEnabled: true,
   *     transferInterval: 'weekly',
   *     automaticAnticipationEnabled: false,
   *   },
   *   metadata: [{
   *     key: '768093',
   *     value: 'Additional information',
   *   }],
   * })
   * ```
   */
  public async update(id: string, payload: Seller): Promise<SellerResponse> {
    return this.api.patch(`/sellers/${id}`, payload)
  }

  /**
   * Remove the seller
   *
   * @link https://docs.malga.io/api#operation/deleteSellerById
   *
   * @param id - Seller ID
   * @returns void
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
   * await malga.sellers.remove('575f9a3c-6e40-4077-852e-c6781dc3c7c7', {
   *   merchantId: 'aa2ec134-6164-4b5b-a7e2-85daefec318d',
   * })
   * ```
   */
  public async remove(id: string, payload: SellerRemovePayload): Promise<void> {
    return this.api.delete(`/sellers/${id}`, payload)
  }
}
