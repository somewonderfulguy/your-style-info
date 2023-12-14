import { componentType } from '~api/pageQueries'

import { getComponent } from '.'

export const componentRenderer = (components: componentType[]) =>
  components.map(({ type, ...props }, idx: string | number) =>
    getComponent(type, props, idx)
  )
