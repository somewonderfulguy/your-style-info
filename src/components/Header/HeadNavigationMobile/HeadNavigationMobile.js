import React, {useEffect, useRef, useState} from 'react'
import {number} from 'prop-types'
import {useSpring, animated, config} from 'react-spring'
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'

import HamburgerIcon from './HamburgerIcon'
import MobileMenu from './MobileMenu'
import styles from './HeadNavigationMobile.module.css'

const propTypes = {menuHeight: number}
const defaultProps = {menuHeight: 0}

const HeadNavigationMobile = ({menuHeight}) => {
  const [isOpen, setIsOpen] = useState(false)
  const subMenuRef = useRef(null)

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

  // disable scroll when menu is open
  useEffect(() => {
    if(!subMenuRef.current) {
      clearAllBodyScrollLocks()
      return
    }

    if(isOpen) {
      disableBodyScroll(subMenuRef.current)
    } else {
      enableBodyScroll(subMenuRef.current)
    }
    return () => clearAllBodyScrollLocks()
  }, [isOpen])

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
          ref={subMenuRef}
        >
          <MobileMenu isOpen={isOpen} />
        </animated.div>
      </animated.div>
    </>
  )
}

HeadNavigationMobile.propTypes = propTypes
HeadNavigationMobile.defaultProps = defaultProps

export default HeadNavigationMobile