import React from 'react'

type propType = {text?: string}

const TextBlock = ({text = ''}: propType) => (
  <p>{text}</p>
)

export default TextBlock