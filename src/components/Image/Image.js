import React from 'react'
import {string} from 'prop-types'

import styles from './Image.module.css'

const propTypes = {
  url: string.isRequired,
  alt: string.isRequired
}

const Image = ({url, alt}) => (
  <img src={url} alt={alt} className={styles.img} />
)

Image.propTypes = propTypes

export default Image