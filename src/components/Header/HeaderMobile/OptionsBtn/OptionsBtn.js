import React, {useRef} from 'react'
import {bool, func} from 'prop-types'
import {useSpring, animated} from 'react-spring'

import {useTheme} from 'helpers/contexts'
import styles from './OptionsBtn.module.css'

const propTypes = {
  isOpen: bool,
  onClick: func
}

const defaultProps = {
  isOpen: false,
  onClick: () => {}
}

const OptionsBtn = ({isOpen, onClick}) => {
  const optionsBtnDOM = useRef(null)
  const {isDarkTheme} = useTheme()
  const optionsHeight = optionsBtnDOM.current ? optionsBtnDOM.current.clientHeight : 0

  // TODO delete this, awful idea
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
    <button ref={optionsBtnDOM} onClick={onClick} className={styles[isDarkTheme ? 'darkBtn' : 'btn']} type="button">
      <animated.div className={styles.dot} style={topDot} />
      <animated.div className={styles.dot} style={middleDot} />
      <animated.div className={styles.dot} style={bottomDot} />
    </button>
  )
}

OptionsBtn.propTypes = propTypes
OptionsBtn.defaultProps = defaultProps

export default OptionsBtn