import { Api } from './api'

import { MalgaConfigurations } from './malga.types'

export class Malga {
  protected readonly api = new Api(this.configurations)

  constructor(readonly configurations: MalgaConfigurations) {}
}
