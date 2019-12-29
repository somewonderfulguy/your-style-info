import React, {useContext, useEffect, useRef, useState} from 'react'
import {animated, useSpring} from 'react-spring'
import {useTranslation} from 'react-i18next'

import {useAnimatedAppearing} from './hooks'
import {useStickyNavBar} from '../hooks'
import {ScreenWidthContext} from '../../../ApplicationNode'
import HeadNavigationDesktop from './HeadNavigationDesktop'
import LangSelector from '../../LangSelector'
import styles from './HeaderDesktop.module.css'

const Header = () => {
  const isDesktop = useContext(ScreenWidthContext) > 1024
  const {t} = useTranslation('', {useSuspense: false})
  const {appearingSprings: [titleAppearing, subTitleAppearing, menuAppearing]} = useAnimatedAppearing()

  // show on scroll-up logic
  const navBarDOM = useRef(null)
  const headerDOM = useRef(null)

  const navbarHeight = navBarDOM.current && (navBarDOM.current.offsetHeight || 0)
  const [navBarTopLine, setNavBarTopLine] = useState(0)

  useEffect(() => {
    setNavBarTopLine(headerDOM.current && headerDOM.current.offsetHeight)
  }, [isDesktop, setNavBarTopLine])

  const {isFixed, isShown} = useStickyNavBar(navBarTopLine + navbarHeight, navBarTopLine)

  // animate menu on scroll up
  const {top: menuTop} = useSpring({
    config: {duration: 200},
    top: isShown ? -1 : navbarHeight * -1
  })

  return (
    <header
      className={styles.header}
      style={{paddingBottom: navbarHeight}}
      ref={headerDOM}
    >
      <div className={styles.langContainer}>
        {isDesktop && <LangSelector />}
      </div>

      <div className={styles.hgroup}>
        <animated.h1 className={styles.title} style={titleAppearing}>
          Your Style
        </animated.h1>
        <animated.p className={styles.subtitle} style={subTitleAppearing}>
          {t('subtitle')}
        </animated.p>
      </div>

      <animated.nav
        ref={navBarDOM}
        style={{
          opacity: menuAppearing.opacity,
          top: isFixed ? menuTop : 'initial'
        }}
        className={isFixed ? styles.fixedNavContainer : styles.navContainer}
      >
        <HeadNavigationDesktop />
      </animated.nav>
    </header>
  )
}

export default Header