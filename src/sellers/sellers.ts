import { Api } from 'src/common/api'

import { ApiPostOptions } from 'src/common/interfaces'

import {
  SellerCreatePayload,
  SellerCreateResponse,
  SellerFindResponse,
  SellerListParams,
  SellerListResponse,
  SellerUpdatePayload,
  SellerUpdateResponse,
  SellerRemovePayload,
} from './interfaces'

export class Sellers {
  constructor(private readonly api: Api) {}

  /**
   * Create a seller
   *
   * @link https://docs.malga.io/docs/api-sdks/docs/sellers/create-seller
   *
   * @param payload - Seller object
   * @param options - API options like `idempotencyKey`
   * @returns Seller API response
   *
   * @example
   * Here is an example of how to create a seller to Split Provider
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
   *
   * * @example
   * Here is an example of how to create a seller to Split Agnostic and Split Subacquirer
   * ```
   * import { Malga } from 'malga'
   *
   * const malga = new Malga({
   *   apiKey: 'API_KEY',
   *   clientId: 'CLIENT_ID',
   * })
   *
   * const seller = await malga.sellers.create({
   *   mcc: 1,
   *   minNegativeBalance: 3000,
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
   *     pixKey: '0197622d-d268-742a-aaf6-6c720dcbb48f',
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
    payload: SellerCreatePayload,
    options?: ApiPostOptions,
  ): Promise<SellerCreateResponse> {
    return this.api.post('/sellers', payload, options?.idempotencyKey)
  }

  /**
   * Find seller details
   *
   * @link https://docs.malga.io/docs/api-sdks/docs/sellers/find-seller
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
  public async find(id: string): Promise<SellerFindResponse> {
    return this.api.get(`/sellers/${id}`)
  }

  /**
   * List the sellers
   *
   * @link https://docs.malga.io/docs/api-sdks/docs/sellers/list-sellers
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
  public async list(params?: SellerListParams): Promise<SellerListResponse> {
    const parsedParams = {
      ...params,
      email: params?.email,
      status: params?.status?.join(),
    }

    return this.api.paginate('/sellers', parsedParams)
  }

  /**
   * Update the seller
   *
   * @link https://docs.malga.io/docs/api-sdks/docs/sellers/update-seller
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
  public async update(
    id: string,
    payload: SellerUpdatePayload,
  ): Promise<SellerUpdateResponse> {
    return this.api.patch(`/sellers/${id}`, payload)
  }

  /**
   * Remove the seller
   *
   * @link https://docs.malga.io/docs/api-sdks/docs/sellers/remove-seller
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
