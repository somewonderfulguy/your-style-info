import React, {useState} from 'react'
import {number} from 'prop-types'
import {useSpring, animated, config} from 'react-spring'

import HamburgerIcon from './HamburgerIcon'
import MobileMenu from './MobileMenu'
import styles from './HeadNavigationMobile.module.css'

const propTypes = {menuHeight: number}
const defaultProps = {menuHeight: 0}

const HeadNavigationMobile = ({menuHeight}) => {
  const [isOpen, setIsOpen] = useState(false)

  // animating menu height
  const {bottom} = useSpring({
    config: config.slow,
    delay: isOpen ? 150 : 0,
    bottom: isOpen ? '0' : '100%'
  })

  // animating menu "lining"
  const {opacity} = useSpring({
    opacity: isOpen ? 1 : 0
  })

  return (
    <>
      <div className={styles.hamburgerContainer} onClick={() => setIsOpen(!isOpen)}>
        <HamburgerIcon isOpen={isOpen} />
      </div>

      <animated.div
        className={styles.lining}
        style={{
          top: menuHeight,
          background: opacity && opacity.interpolate(o => `rgba(0, 0, 0, ${o / 1.3})`),
          visibility: opacity.interpolate(o => o > 0 ? 'visible' : 'hidden')
        }}
      >
        <animated.div
          className={styles.mobileMenuContainer}
          style={{
            top: menuHeight,
            bottom,
            borderWidth: bottom.interpolate(b => +b.slice(0, -1) < 90 ? 1 : 0)
          }}
        >
          <MobileMenu/>
        </animated.div>
      </animated.div>
    </>
  )
}

HeadNavigationMobile.propTypes = propTypes
HeadNavigationMobile.defaultProps = defaultProps

export default HeadNavigationMobile