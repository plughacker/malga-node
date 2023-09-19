export interface MalgaConfigurations {
  apiKey: string
  clientId: string
  options?: {
    sandbox?: boolean
    http?: { retries?: number; retryDelay?: number }
  }
}
