import React from 'react'
import {string} from 'prop-types'

import styles from './Image.module.css'

const propTypes = {
  url: string.isRequired,
  alt: string
}

const defaultProps = {
  alt: ''
}

const Image = ({url, alt}) => (
  <img src={url} alt={alt} className={styles.img} />
)

Image.propTypes = propTypes
Image.defaultProps = defaultProps

export default Image