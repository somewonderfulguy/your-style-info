import {getComponent} from './'

export const componentRenderer = components => (
  components.map(({type, ...props}, idx) => getComponent(type, props, idx))
)