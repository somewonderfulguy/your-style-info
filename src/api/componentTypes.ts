export enum ComponentType {
  // keep in alphabetical order
  Heading = 'heading',
  Image = 'image',
  Text = 'text'
}

export type AnyComponent = ImageComponent | TextComponent

export type BaseComponent = {
  type: ComponentType
  contentWidth?: 'feature' | 'full' | 'content' | 'popup'
}

export type ComponentPropsMapping = {
  // keep in alphabetical order
  [ComponentType.Heading]: Omit<HeadingComponent, 'type'>
  [ComponentType.Image]: Omit<ImageComponent, 'type'>
  [ComponentType.Text]: Omit<TextComponent, 'type'>
}

// keep all components in alphabetical order

export type HeadingComponent = BaseComponent & {
  type: ComponentType.Heading
  children: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export type ImageComponent = BaseComponent & {
  type: ComponentType.Image
  url: string
  lowresBase64: string | null
  alt: string
  caption: string
  height: number
  width: number | string
}

export type TextComponent = BaseComponent & {
  type: ComponentType.Text
  children: string
}
