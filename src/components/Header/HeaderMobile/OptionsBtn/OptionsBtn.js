import React, {useRef} from 'react'
import {bool, func} from 'prop-types'
import {useSpring, animated} from 'react-spring'

import styles from './OptionsBtn.module.css'

const propTypes = {
  isOpen: bool,
  onClick: func
}

const defaultProps = {
  isOpen: false,
  onClick: () => {}
}

// TODO TEST if button clicked, then isOpen changes

const OptionsIcon = ({isOpen, onClick}) => {
  const optionsBtnDOM = useRef(null)
  const optionsHeight = optionsBtnDOM.current ? optionsBtnDOM.current.clientHeight : 0

  const dotSize = +(
    getComputedStyle(document.documentElement).getPropertyValue('--mobile-menu-options-dot-diameter')
      .replace('px', '')
      || 4
  )
  const shrinkedDotSize = dotSize / 2

  const middlePosition = (optionsHeight / 2) - shrinkedDotSize / 2

  const {timeline} = useSpring({
    config: {duration: 300},
    timeline: isOpen ? 1 : 0
  })

  const range = [0, 0.4, 0.6, 1]

  const topDot = {
    top: timeline.interpolate(range, [0, middlePosition, middlePosition, middlePosition]),
    width: timeline.interpolate(range, [4, 2, 2, 24]),
    height: timeline.interpolate(range, [4, 2, 2, 2]),
    borderRadius: timeline.interpolate(range, ['50%', '0', '0', '0'])
  }

  const bottomDot = {
    bottom: topDot.top,
    width: topDot.width,
    height: topDot.height,
    borderRadius: timeline.interpolate(range, ['50%', '0', '0', '0'])
  }

  const middleDot = {
    opacity: timeline.interpolate({range, output: [1, 0, 0, 0]})
  }

  return (
    <button ref={optionsBtnDOM} onClick={onClick} className={styles.btn} type="button">
      <animated.div style={topDot} />
      <animated.div style={middleDot} />
      <animated.div style={bottomDot} />
    </button>
  )
}

OptionsIcon.propTypes = propTypes
OptionsIcon.defaultProps = defaultProps

export default OptionsIcon