import React, {useEffect, useCallback, useRef, useState} from 'react'
import {animated, useSpring} from 'react-spring'

import {useHeaderHeight} from 'contexts'
import {useForceUpdate} from 'helpers/hooks'
import {useStickyNavBar} from '../hooks'
import {useAnimatedAppearing} from './hooks'
import HamburgerIcon from './HamburgerIcon'
import HeadNavigationMobile from './HeadNavigationMobile'
import Options from './Options'
import OptionsBtn from './OptionsBtn'
import styles from './HeaderMobile.module.css'

const Header = () => {
  const {setHeaderHeight} = useHeaderHeight()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isOptionsOpen, setOptionsOpen] = useState(false)

  const {appearingSpring} = useAnimatedAppearing()

  const headerDOM = useRef(null)
  const headerHeight = headerDOM.current && (headerDOM.current.offsetHeight || 0)

  // forcing update on first render to make headerHeight not null
  const forceUpdate = useForceUpdate()
  useEffect(() => void forceUpdate(), [forceUpdate])

  useEffect(() => {
    setHeaderHeight(headerHeight)
    return () => setHeaderHeight(0)
  }, [headerHeight, setHeaderHeight])

  const {isFixed, isShown, isScrollDown} = useStickyNavBar(headerHeight)

  // animate header on scroll up
  const {headerTop} = useSpring({
    config: {duration: 200},
    headerTop: isShown ? -1 : -headerHeight
  })

  const onHamburgerClick = useCallback(() => setMenuOpen(i => !i), [setMenuOpen])
  const onOptionsClick = useCallback(() => setOptionsOpen(i => !i), [setOptionsOpen])

  const menuHeight = headerHeight - (isFixed ? 1 : 0) || 0

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
        <div className={styles.optionsContainer}>
          {/* WARN!!! it may seem not obvious - onClick here works, but when closing menu it's overrided by
            <Options /> with its handleClick outside method */}
          <OptionsBtn isOpen={isOptionsOpen} onClick={onOptionsClick} />
        </div>
      </animated.header>

      {/* Moved outside because animated header (transform) breaks position: fixed for child elements */}
      <HeadNavigationMobile isOpen={isMenuOpen} menuHeight={menuHeight} />
      <Options
        isOpen={isOptionsOpen}
        menuHeight={menuHeight}
        setOptionsOpen={setOptionsOpen}
        isFixed={isFixed}
        isShown={isShown}
        isScrollDown={isScrollDown}
        headerTop={headerTop}
      />
    </>
  )
}

export default Header