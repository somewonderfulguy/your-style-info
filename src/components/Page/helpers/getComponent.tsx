import React from 'react'

import { componentTypes } from 'api'
import Image from 'components/Image'
import TextBlock from 'components/TextBlock'

export const getComponent = (
  type: componentTypes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  idx: number | string
) => {
  switch (type) {
    case 'image':
      return <Image key={idx} {...props} />

    case 'text':
      return <TextBlock key={idx} {...props} />

    default:
      console.warn(`Unknown feature name provided ${type}`)
      return null
  }
}
