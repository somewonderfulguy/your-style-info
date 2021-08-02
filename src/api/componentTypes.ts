export type imageComponent = {
  type: 'image'
  url: string
  lowresBase64: string
  alt: string
  caption: string
  height: number
  width: number
}

export type textComponent = {
  type: 'text'
  text: string
}