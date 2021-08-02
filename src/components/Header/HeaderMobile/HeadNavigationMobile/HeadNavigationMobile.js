import React, {memo, useEffect, useRef} from 'react'
import {bool, func, number} from 'prop-types'
import {useSpring, animated, config} from 'react-spring'
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'

import MobileMenu from './MobileMenu'
import styles from './HeadNavigationMobile.module.css'

const propTypes = {
  menuHeight: number,
  isOpen: bool,
  setMenuOpen: func.isRequired
}

const defaultProps = {
  menuHeight: 0,
  isOpen: false
}

const HeadNavigationMobile = ({menuHeight, isOpen, setMenuOpen}) => {
  const subMenuDOM = useRef(null)
  const mobileMenuDOM = useRef(null)

  // animating menu height
  const {bottom: menuBottom} = useSpring({
    config: isOpen ? config.slow : config.default,
    delay: isOpen ? 150 : 0,
    bottom: isOpen ? '0' : '100%',
    onRest: () => !isOpen && mobileMenuDOM.current.resetAnimation()
  })

  // animating menu "lining"
  const {opacity: liningOpacity} = useSpring({
    opacity: isOpen ? 1 : 0
  })

  // disable scroll when menu is open
  useEffect(() => {
    if(!subMenuDOM.current) {
      clearAllBodyScrollLocks()
      return
    }

    if(isOpen) {
      disableBodyScroll(subMenuDOM.current)
    } else {
      enableBodyScroll(subMenuDOM.current)
    }
    return () => clearAllBodyScrollLocks()
  }, [isOpen])

  return (
    <animated.nav
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
        ref={subMenuDOM}
      >
        <MobileMenu isOpen={isOpen} ref={mobileMenuDOM} setMenuOpen={setMenuOpen} />
      </animated.div>
    </animated.nav>
  )
}

HeadNavigationMobile.propTypes = propTypes
HeadNavigationMobile.defaultProps = defaultProps

export default memo(HeadNavigationMobile)