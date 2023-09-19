import axios, { AxiosError, AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'

import { MalgaConfigurations } from '../malga.types'

export class Api {
  private static TEN_SECONDS_RETRY_DELAY = 10 * 1000
  private readonly api: AxiosInstance

  constructor(readonly configurations: MalgaConfigurations) {
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

  public async get(path: string) {
    return this.api.get(path)
  }

  public async post<Data>(path: string, data: Data, idempotencyKey?: string) {
    const headers: Record<string, string> = {}

    if (idempotencyKey) {
      headers['X-Idempotency-Key'] = idempotencyKey
    }

    return this.api.post(path, data, { headers })
  }

  public async delete(path: string) {
    return this.api.delete(path)
  }

  public async patch<Data>(path: string, data: Data) {
    return this.api.patch(path, data)
  }

  public async put<Data>(path: string, data: Data) {
    return this.api.put(path, data)
  }
}
