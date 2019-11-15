import React, {useContext, useRef} from 'react'
import {animated, useSpring, useSprings} from 'react-spring'
import {useTranslation} from 'react-i18next'

import {useStickyNavBar} from './hooks'
import {ScreenWidthContext} from '../../ApplicationNode'
import HeadNavigationDesktop from './HeadNavigationDesktop'
import HeadNavigationMobile from './HeadNavigationMobile'
import LangSelector from '../LangSelector'
import styles from './Header.module.css'

// TODO refactor appearing logic - separate for desktop and mobile
const Header = () => {
  const screenWidth = useContext(ScreenWidthContext)
  const {t} = useTranslation('', {useSuspense: false})
  const headerDomRef = useRef(null)

  // animated header appearing
  const springs = useSprings(3, [...Array(3)].map((i, n) => ({
    config: {mass: 1, tension: 280, friction: 50},
    from: {
      opacity: 0,
      transform: 'translate3d(-20px, 0, 0)'
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    },
    delay: n === 0 ? 0 : 180 * n
  })))

  // show on scroll-up logic
  const navbarRef = React.useRef(null)
  const navbarHeight = navbarRef.current && (navbarRef.current.offsetHeight || 0)

  const {isFixed, isShown} = useStickyNavBar(navbarRef.current)

  const {top} = useSpring({
    config: {duration: 200},
    top: isShown ? -1 : navbarHeight * -1
  })

  const paddingDesktop = screenWidth > 1024 ? {paddingBottom: navbarHeight} : {}

  return (
    <header className={styles.header} style={paddingDesktop} ref={headerDomRef}>
      <div className={styles.langContainer}>
        {(screenWidth > 1024) && <LangSelector />}
      </div>

      <div className={styles.hgroup}>
        <animated.h1 className={styles.title} style={springs[0]}>
          Your Style
        </animated.h1>
        {/* TODO use HTML text block instead of div */}
        <animated.div className={styles.subtitle} style={springs[1]}>
          {t('subtitle')}
        </animated.div>
      </div>

      <animated.nav
        ref={navbarRef}
        style={{opacity: springs[2].opacity, top: isFixed ? top : 'initial'}}
        className={isFixed ? styles.fixedNavContainer : styles.navContainer}
      >
        {/* FIXME - doesn't work properly */}
        {screenWidth > 1024 ? (
          <HeadNavigationDesktop />
        ) : (
          <HeadNavigationMobile menuHeight={headerDomRef.current ? headerDomRef.current.offsetHeight : 0} />
        )}
        
      </animated.nav>
    </header>
  )
}

export default Header