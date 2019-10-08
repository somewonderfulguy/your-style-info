import React from 'react'

import Image from '../components/Image'
import TextBlock from '../components/TextBlock'

export const getComponent = (type, props, idx) => {
  switch(type) {
    case 'image':
      return <Image key={idx} {...props} />

    case 'text':
      return <TextBlock key={idx} {...props} />

    default:
      console.warn(`Unknown feature name provided ${type}`)
      return null
      //TODO: either delete or implement that component
      //return <UnknownFeature {...props} />
  }
}