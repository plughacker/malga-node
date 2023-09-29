import { Api, ApiPostOptions, ApiPaginateResponse } from 'src/common/api'
import { Customer } from 'src/common/interfaces/customer'

import {
  CustomerUpdatePayload,
  CustomerUpdateResponse,
  CustomerListParams,
  CustomerCardsResponse,
  CustomerLinkCardPayload,
  CustomerCreateResponse,
} from './customers.types'

export class Customers {
  constructor(private readonly api: Api) {}

  /**
   * Create a customer
   *
   * @link https://docs.malga.io/api#operation/createCustomer
   *
   * @param payload - Customer object
   * @param options - API options like `idempotencyKey`
   * @returns Customer API response
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
   * const customer = await malga.customers.create({
   *   name: 'Homer Simpson',
   *   email: 'homer@simpsons.com',
   *   phoneNumber: '99999999999',
   *   document: {
   *     type: 'cpf',
   *     number: '99999999999',
   *     country: 'BR',
   *   },
   *   address: {
   *     street: 'Evergreen Terrace',
   *     streetNumber: '742',
   *     zipCode: '62629',
   *     country: 'US',
   *     state: 'Louisiana',
   *     city: 'Springfield',
   *     district: 'Suburb',
   *     complement: 'Residence',
   *   },
   * })
   * ```
   */
  public async create(
    payload: Customer,
    options?: ApiPostOptions,
  ): Promise<CustomerCreateResponse> {
    return this.api.post('/customers', payload, options?.idempotencyKey)
  }

  /**
   * Find customer details
   *
   * @link https://docs.malga.io/api#operation/getCustomer
   *
   * @param id - Customer ID
   * @returns Customer API response
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
   * const customer = await malga.customers.find('e917fc6d-c640-47a1-83eb-aa820dbd92fe')
   * ```
   */
  public async find(id: string): Promise<Customer> {
    return this.api.get(`/customers/${id}`)
  }

  /**
   * List the customers
   *
   * @link https://docs.malga.io/api#operation/ListCustomers
   *
   * @param params - Filter params
   * @returns Customer API response
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
   * const customers = await malga.customers.list({ page: 1, limit: 15 })
   * ```
   */
  public async list(
    params?: CustomerListParams,
  ): Promise<ApiPaginateResponse<Customer>> {
    const parsedParams = {
      page: params?.page,
      limit: params?.limit,
      sort: params?.sort,
      'document.type': params?.documentType,
      'document.number': params?.documentNumber,
    }

    return this.api.paginate('/customers', parsedParams)
  }

  /**
   * Update the customer
   *
   * @link https://docs.malga.io/api#operation/updateCustomer
   *
   * @param id - Customer ID
   * @param payload - Updated customer object
   * @returns Customer API response
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
   * const customer = await malga.customers.update(
   *  '575f9a3c-6e40-4077-852e-c6781dc3c7c7',
   *  { name: 'Bart Simpson', phoneNumber: '99999999998' }
   * )
   * ```
   */
  public async update(
    id: string,
    payload: CustomerUpdatePayload,
  ): Promise<CustomerUpdateResponse> {
    return this.api.patch(`/customers/${id}`, payload)
  }

  /**
   * Remove the customer
   *
   * @link https://docs.malga.io/api#operation/deleteCustomer
   *
   * @param id - Customer ID
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
   * await malga.customers.remove('575f9a3c-6e40-4077-852e-c6781dc3c7c7')
   * ```
   */
  public async remove(id: string): Promise<void> {
    return this.api.delete(`/customers/${id}`)
  }

  /**
   * List customer cards
   *
   * @link https://docs.malga.io/api#operation/getCustomerCards
   *
   * @param id - Customer ID
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
   * const customerCards = await malga.customers.cards('575f9a3c-6e40-4077-852e-c6781dc3c7c7')
   * ```
   */
  public async cards(id: string): Promise<CustomerCardsResponse[]> {
    return this.api.get(`/customers/${id}/cards`)
  }

  /**
   * Link customer to card
   *
   * @link https://docs.malga.io/api#operation/linkCard
   *
   * @param id - Customer ID
   * @param payload - Card informations
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
   * await malga.customers.linkCard('575f9a3c-6e40-4077-852e-c6781dc3c7c7', {
   *   cardId: '13c2a9c0-9936-4024-b8a8-1952dbdc5460'
   * })
   * ```
   */
  public async linkCard(
    id: string,
    payload: CustomerLinkCardPayload,
    options?: ApiPostOptions,
  ): Promise<void> {
    return this.api.post(
      `/customers/${id}/cards`,
      payload,
      options?.idempotencyKey,
    )
  }
}
