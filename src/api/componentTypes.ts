export enum ComponentType {
  Image = 'image',
  Text = 'text'
}

export type BaseComponent = {
  type: ComponentType
  contentWidth?: 'content' | 'popup' | 'feature' | 'full'
}

export type ImageComponent = BaseComponent & {
  type: ComponentType.Image
  url: string
  lowresBase64: string
  alt: string
  caption: string
  height: number
  width: number
}

export type TextComponent = BaseComponent & {
  type: ComponentType.Text
  text: string
}

export type AnyComponent = ImageComponent | TextComponent

export type ComponentPropsMapping = {
  [ComponentType.Image]: Omit<ImageComponent, 'type'>
  [ComponentType.Text]: Omit<TextComponent, 'type'>
}
