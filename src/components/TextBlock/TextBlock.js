import React from 'react'
import {string} from 'prop-types'

const propTypes = {
  text: string
}

const defaultProps = {
  text: ''
}

const TextBlock = ({text}) => (
  <p>{text}</p>
)

TextBlock.propTypes = propTypes
TextBlock.defaultProps = defaultProps

export default TextBlock