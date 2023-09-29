import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'

import {
  ApiPaginateParamsBase,
  MalgaConfigurations,
  MalgaErrorResponse,
} from 'src/common/interfaces'

export class Api {
  private static TEN_SECONDS_RETRY_DELAY = 10 * 1000
  private readonly api: AxiosInstance

  constructor(private readonly configurations: MalgaConfigurations) {
    this.api = axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.configurations.apiKey,
        'X-Client-Id': this.configurations.clientId,
      },
    })

    axiosRetry(this.api, {
      retries: this.configurations.options?.http?.retries ?? 3,
      retryDelay: this.handleRetryDelay,
      retryCondition: this.handleRetryCondition,
    })
  }

  private getBaseUrl() {
    if (process.env.MALGA_API_URL) return process.env.MALGA_API_URL

    if (this.configurations.options?.sandbox) {
      return 'https://sandbox-api.malga.io/v1'
    }

    return 'https://api.malga.io/v1'
  }

  private handleRetryDelay() {
    return (
      this.configurations.options?.http?.retryDelay ??
      Api.TEN_SECONDS_RETRY_DELAY
    )
  }

  private handleRetryCondition(error: AxiosError) {
    const isPostMethod = error.request.method === 'POST'
    const isUsingIdempotencyKey = error.request.getHeader('X-Idempotency-Key')

    if (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (isUsingIdempotencyKey && isPostMethod)
    ) {
      return true
    }

    return false
  }

  private handlePaginateParams<Params>(params?: Params) {
    if (!params) return ''

    const parsedParams = Object.entries(params)
    const transformParams = parsedParams.reduce((acc, [key, value]) => {
      if (!value) return acc

      const currentParam = `${key}=${value}`

      return !acc ? currentParam : `${acc}&${currentParam}`
    }, '')

    return `?${transformParams}`
  }

  private handleSuccess(response: AxiosResponse) {
    return response.data
  }

  private handleError(error: AxiosError<any>): Promise<MalgaErrorResponse> {
    if (!error.response?.data || error.response.status >= 500) {
      return Promise.reject({
        error: {
          type: 'api_error',
          code: 500,
          message: 'unexpected error',
        },
      })
    }

    if (error.response.status === 403) {
      return Promise.reject({
        error: {
          type: 'invalid_request_error',
          code: 403,
          message: 'forbidden',
        },
      })
    }

    if (error.response.data?.error?.type === 'card_declined') {
      return Promise.reject({
        error: {
          type: error.response.data?.error.type,
          code: error.response.data?.error.code,
          message: error.response.data?.error.message,
          declinedCode: error.response.data?.error.declined_code,
        },
      })
    }

    return Promise.reject(error.response.data)
  }

  public async get(path: string) {
    return this.api.get(path).then(this.handleSuccess).catch(this.handleError)
  }

  public async post<Payload>(
    path: string,
    payload?: Payload,
    idempotencyKey?: string,
    publicKey?: string,
  ) {
    const headers: Record<string, string> = {}

    if (idempotencyKey) {
      headers['X-Idempotency-Key'] = idempotencyKey
    }

    if (publicKey) {
      headers['X-Api-Key'] = publicKey
    }

    return this.api
      .post(path, payload, { headers })
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  public async delete<Payload>(path: string, payload?: Payload) {
    return this.api
      .delete(path, { data: payload })
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  public async patch<Payload>(path: string, payload: Payload) {
    return this.api
      .patch(path, payload)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  public async put<Payload>(path: string, payload: Payload) {
    return this.api
      .put(path, payload)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  public async paginate<Params = ApiPaginateParamsBase>(
    path: string,
    params?: Params,
  ) {
    const paginateParams = this.handlePaginateParams<Params>(params)

    return this.api
      .get(`${path}${paginateParams}`)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }
}
