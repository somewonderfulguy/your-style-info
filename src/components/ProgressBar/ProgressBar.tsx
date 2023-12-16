import { useLayoutEffect, useRef } from 'react'

import styles from './ProgressBar.module.css'

type Props = {
  width?: string
  height?: string | number
  value?: string | number
}

const ProgressBar = ({ width = '100%', height = 5, value = 0 }: Props) => {
  const progressDOM = useRef<HTMLProgressElement>(null)

  useLayoutEffect(() => {
    progressDOM.current?.style.setProperty('--value', `${value}%`)
  }, [value])

  return (
    <progress
      style={{ width, height }}
      className={styles.progressBar}
      value={value}
      max="100"
      ref={progressDOM}
    />
  )
}

export default ProgressBar
