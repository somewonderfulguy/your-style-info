import React, {useEffect, useRef} from 'react'
import {bool, number} from 'prop-types'
import {useSpring, animated, config} from 'react-spring'
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'

import MobileMenu from './MobileMenu'
import styles from './HeadNavigationMobile.module.css'

const propTypes = {
  menuHeight: number,
  isOpen: bool
}

const defaultProps = {
  menuHeight: 0,
  isOpen: false
}

const HeadNavigationMobile = ({menuHeight, isOpen}) => {
  const subMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)

  // animating menu height
  const {bottom: menuBottom} = useSpring({
    config: isOpen ? config.slow : config.default,
    delay: isOpen ? 150 : 0,
    bottom: isOpen ? '0' : '100%',
    onRest: () => !isOpen && mobileMenuRef.current.resetAnimation()
  })

  // animating menu "lining"
  const {opacity: liningOpacity} = useSpring({
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
    <animated.div
      className={styles.lining}
      style={{
        top: menuHeight,
        background: liningOpacity && liningOpacity.interpolate(o => `rgba(0, 0, 0, ${o / 1.3})`),
        visibility: liningOpacity.interpolate(o => o > 0 ? 'visible' : 'hidden')
      }}
    >
      <animated.div
        className={styles.mobileMenuContainer}
        style={{
          top: menuHeight,
          bottom: menuBottom,
          borderWidth: menuBottom.interpolate(b => +b.slice(0, -1) < 90 ? 1 : 0)
        }}
        ref={subMenuRef}
      >
        <MobileMenu isOpen={isOpen} ref={mobileMenuRef} />
      </animated.div>
    </animated.div>
  )
}

HeadNavigationMobile.propTypes = propTypes
HeadNavigationMobile.defaultProps = defaultProps

export default HeadNavigationMobile