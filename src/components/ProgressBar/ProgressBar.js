import React, {useLayoutEffect, useRef} from 'react'
import {number, oneOfType, string} from 'prop-types'

import styles from './ProgressBar.module.css'

const propTypes = {
  width: string,
  height: string,
  value: oneOfType([number, string])
}

const defaultProps = {
  width: '100%',
  height: '5px',
  value: 0
}

const ProgressBar = ({width, height, value}) => {
  const progressDOM = useRef()

  useLayoutEffect(() => {
    progressDOM.current && progressDOM.current.style.setProperty('--value', `${value}%`)
  }, [value])

  if(+value === 100) return null

  return (
    <progress
      style={{
        width,
        height,
      }}
      className={styles.progressBar}
      value={value}
      max="100"
      ref={progressDOM}
    />
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar