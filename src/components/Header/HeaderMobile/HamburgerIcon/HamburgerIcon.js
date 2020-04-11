import React, {memo, useRef} from 'react'
import {bool, func} from 'prop-types'
import {useSpring, animated} from 'react-spring'

import styles from './HamburgerIcon.module.css'

const propTypes = {
  isOpen: bool,
  onClick: func
}

const defaultProps = {
  isOpen: false,
  onClick: () => {}
}

const HamburgerIcon = ({isOpen, onClick}) => {
  const hamburgerDOM = useRef(null)
  const hamburgerHeight = hamburgerDOM.current ? hamburgerDOM.current.clientHeight : 0
  const lineHeight = hamburgerDOM.current ? hamburgerDOM.current.querySelector('div').clientHeight : 0
  const middlePosition = hamburgerHeight / 2 - lineHeight / 2
  const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--mobile-menu-hamburger-color')

  const {timeline} = useSpring({
    config: {duration: 350},
    timeline: isOpen ? 1 : 0
  })

  const range = [0, 0.4, 0.6, 1]

  const topLine = {
    top: timeline.interpolate(range, [0, middlePosition, middlePosition, middlePosition]),
    transform: timeline.interpolate({range, output: [0, 0, 0, 45]}).interpolate(x => `rotate(${x}deg)`)
  }

  const bottomLine = {
    bottom: topLine.top,
    transform: timeline.interpolate({range, output: [0, 0, 0, 45]}).interpolate(x => `rotate(-${x}deg)`)
  }

  const midLine = {
    background: timeline.interpolate({range, output: [lineColor || '#000', 'transparent', 'transparent', 'transparent']})
  }

  return (
    <button ref={hamburgerDOM} onClick={onClick} className={styles.hamburger} type="button">
      <animated.div style={topLine} />
      <animated.div style={midLine} />
      <animated.div style={bottomLine} />
    </button>
  )
}

HamburgerIcon.propTypes = propTypes
HamburgerIcon.defaultProps = defaultProps

export default memo(HamburgerIcon)