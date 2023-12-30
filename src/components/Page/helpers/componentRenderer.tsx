import {
  AnyComponent,
  ComponentPropsMapping,
  ComponentType,
  ImageComponent,
  TextComponent
} from '~api/componentTypes'
import Image from '~components/Image'
import TextBlock from '~components/TextBlock'

export const componentRenderer = (components: AnyComponent[]) =>
  components.map(({ type, ...props }, idx: string | number) =>
    createComponent(type, props, idx)
  )

export function createComponent<T extends ComponentType>(
  type: T,
  props: ComponentPropsMapping[T],
  idx: number | string
) {
  switch (type) {
    // keep in alphabetical order

    case ComponentType.Image:
      return <Image key={idx} {...(props as ImageComponent)} />

    case ComponentType.Text:
      return <TextBlock key={idx} {...(props as TextComponent)} />

    default:
      console.warn(`Unknown component type provided: ${type}`)
      return null
  }
}
