import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import {bool, func} from 'prop-types'
import {useSpring, animated} from 'react-spring'

import {useTheme} from 'contexts'
import styles from './OptionsBtn.module.css'

const propTypes = {
  isOpen: bool,
  onClick: func.isRequired
}

const defaultProps = {
  isOpen: false,
  onClick: () => {}
}

const OptionsBtn = forwardRef(({isOpen, onClick}, ref) => {
  const optionsBtnDOM = useRef(null)
  useImperativeHandle(ref, () => ({optionsBtnDOM}))

  const {isDarkTheme} = useTheme()

  const optionsHeight = optionsBtnDOM.current ? optionsBtnDOM.current.clientHeight : 0

  const dotSize = 4
  const shrinkedDotSize = dotSize / 2
  const middlePosition = (optionsHeight / 2) - shrinkedDotSize / 2

  const {timeline} = useSpring({
    config: {duration: 300},
    timeline: isOpen ? 1 : 0
  })

  const range = [0, 0.4, 0.6, 1]

  const topDot = {
    top: timeline.interpolate(range, [0, middlePosition, middlePosition, middlePosition]),
    width: timeline.interpolate(range, [dotSize, shrinkedDotSize, shrinkedDotSize, 24]),
    height: timeline.interpolate(range, [dotSize, shrinkedDotSize, shrinkedDotSize, 2]),
    borderRadius: timeline.interpolate(range, ['50%', '0', '0', '0'])
  }

  const bottomDot = {
    bottom: topDot.top,
    width: topDot.width,
    height: topDot.height,
    borderRadius: timeline.interpolate(range, ['50%', '0', '0', '0'])
  }

  const middleDot = {
    width: dotSize,
    height: dotSize,
    opacity: timeline.interpolate({range, output: [1, 0, 0, 0]})
  }

  return (
    <button
      ref={optionsBtnDOM}
      onClick={onClick}
      className={styles[isDarkTheme ? 'darkBtn' : 'btn']}
      type="button"
      title="Options"
    >
      <animated.div className={styles.dot} style={topDot} />
      <animated.div className={styles.dot} style={middleDot} />
      <animated.div className={styles.dot} style={bottomDot} />
    </button>
  )
})

OptionsBtn.propTypes = propTypes
OptionsBtn.defaultProps = defaultProps

export default OptionsBtn