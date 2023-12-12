import { getComponent } from '.'

import { componentType } from 'api'

export const componentRenderer = (components: componentType[]) =>
  components.map(({ type, ...props }, idx: string | number) =>
    getComponent(type, props, idx)
  )
