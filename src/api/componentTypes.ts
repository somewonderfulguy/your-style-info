export enum componentTypes {
  image = 'image',
  text = 'text'
}

export type imageComponent = {
  type: componentTypes.image
  url: string
  lowresBase64: string
  alt: string
  caption: string
  height: number
  width: number
}

export type textComponent = {
  type: componentTypes.text
  text: string
}
