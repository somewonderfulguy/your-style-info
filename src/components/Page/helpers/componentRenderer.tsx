import {
  AnyComponent,
  ComponentPropsMapping,
  ComponentType,
  HeadingComponent,
  ImageComponent,
  TextComponent,
  TilesCarouselComponent
} from '~api/pageApi'
import Heading from '~components/Heading'
import Image from '~components/Image'
import TextBlock from '~components/TextBlock'
import TilesCarousel from '~components/TilesCarousel'

export const componentRenderer = (components: AnyComponent[]) =>
  components.map((props, idx: string | number) =>
    createComponent(props.type, props, idx)
  )

export function createComponent<T extends ComponentType>(
  type: T,
  props: ComponentPropsMapping[T],
  idx: number | string
) {
  switch (type) {
    // keep in alphabetical order

    case ComponentType.Heading:
      return <Heading key={idx} {...(props as HeadingComponent)} />

    case ComponentType.Image:
      return <Image key={idx} {...(props as ImageComponent)} />

    case ComponentType.Text:
      return <TextBlock key={idx} {...(props as TextComponent)} />

    case ComponentType.TilesCarousel:
      return <TilesCarousel key={idx} {...(props as TilesCarouselComponent)} />

    default:
      console.warn(`Unknown component type provided: ${type}`)
      return null
  }
}
