import React, {useEffect, useCallback, useRef, useState} from 'react'
import {animated, useSpring} from 'react-spring'

import {useAnimatedAppearing} from './hooks'
import {useStickyNavBar} from '../hooks'
import {useForceUpdate} from '../../../helpers/hooks'
import HamburgerIcon from './HamburgerIcon'
import HeadNavigationMobile from './HeadNavigationMobile'
import styles from './HeaderMobile.module.css'

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const {appearingSpring} = useAnimatedAppearing()

  const headerDOM = useRef(null)
  const headerHeight = headerDOM.current && (headerDOM.current.offsetHeight || 0)

  // forcing update on first render to make headerHeight not null
  const forceUpdate = useForceUpdate()
  useEffect(() => void forceUpdate(), [forceUpdate])

  useEffect(() => {
    document.body.style.marginTop = headerHeight + 'px'
    return () => document.body.style.marginTop = ''
  }, [headerHeight])

  const {isFixed, isShown} = useStickyNavBar(headerHeight)

  // animate header on scroll up
  const {headerTop} = useSpring({
    config: {duration: 200},
    headerTop: isShown ? -1 : -headerHeight
  })

  const onHamburgerClick = useCallback(() => setMenuOpen(!isMenuOpen), [setMenuOpen, isMenuOpen])

  return (
    <>
      <animated.header
        ref={headerDOM}
        className={styles.header}
        style={{
          ...appearingSpring,
          position: isFixed ? 'fixed' : 'absolute',
          transform: isFixed ? headerTop.interpolate(i => `translate3d(0, ${i}px, 0)`) : 'initial'
        }}
      >
        <div className={styles.hamburgerContainer}>
          <HamburgerIcon isOpen={isMenuOpen} onClick={onHamburgerClick} />
        </div>
        <h1 className={styles.title}>
          Your Style
        </h1>
      </animated.header>
      {/* Moved outside because animated header (transform) breaks position: fixed for child elements */}
      <HeadNavigationMobile
        isOpen={isMenuOpen}
        menuHeight={headerHeight - (isFixed ? 1 : 0) || 0}
      />
    </>
  )
}

export default Header