import { Api } from './api'

import { MalgaConfigurations } from './malga.types'

export class Malga {
  protected readonly api: Api

  constructor(readonly configurations: MalgaConfigurations) {
    this.api = new Api(configurations)
  }
}
