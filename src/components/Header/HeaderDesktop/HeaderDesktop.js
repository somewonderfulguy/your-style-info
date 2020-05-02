import React, {useEffect, useRef, useState} from 'react'
import {animated, useSpring} from 'react-spring'
import {useTranslation} from 'react-i18next'

import {useAnimatedAppearing} from './hooks'
import {useStickyNavBar} from '../hooks'
import HeadNavigationDesktop from './HeadNavigationDesktop'
import DarkThemeSwitcher from '../../DarkThemeSwitcher'
import LangSelector from '../../LangSelector'
import SocialMediaIcons from '../../SocialMediaIcons'
import styles from './HeaderDesktop.module.css'

const HeaderDesktop = () => {
  const {t} = useTranslation('', {useSuspense: false})
  const {appearingSprings: [firstAppearing, secondAppearing, thirdAppearing, forthAppearing]} = useAnimatedAppearing()

  const [isMenuOpen, setMenuOpen] = useState(false)

  // show on scroll-up logic
  const navBarDOM = useRef(null)
  const headerDOM = useRef(null)

  const navbarHeight = navBarDOM.current && (navBarDOM.current.offsetHeight || 0)
  const [navBarTopLine, setNavBarTopLine] = useState(0)

  useEffect(() => {
    setNavBarTopLine(headerDOM.current && headerDOM.current.offsetHeight)
  }, [setNavBarTopLine])

  const {isFixed, isShown} = useStickyNavBar(navBarTopLine + (isMenuOpen ? 0 : navbarHeight), navBarTopLine)

  // animate menu on scroll up
  const {top: menuTop} = useSpring({
    config: {duration: 200},
    top: isShown || isMenuOpen ? -1 : navbarHeight * -1
  })

  return (
    <header
      style={{paddingBottom: navbarHeight}}
      ref={headerDOM}
    >
      <div className={styles.aboveNav}>
        <div className={styles.hgroup}>
          <animated.h1 className={styles.title} style={firstAppearing}>
            Your Style
          </animated.h1>
          <animated.p className={styles.subtitle} style={secondAppearing}>
            {t('subtitle')}
          </animated.p>
        </div>
        <div className={styles.sideControlsContainer}>
          <animated.div style={{
            opacity: secondAppearing.opacity,
            transform: secondAppearing.reverseTransform,
            zIndex: 1
          }}>
            <LangSelector />
          </animated.div>
          <animated.div className={styles.sideControlsSocialMedia} style={{
            opacity: thirdAppearing.opacity,
            transform: thirdAppearing.reverseTransform
          }}>
            <SocialMediaIcons small color="lightgray" />
          </animated.div>
          <animated.div className={styles.sideControlsDarkTheme} style={{
            opacity: forthAppearing.opacity,
            transform: forthAppearing.reverseTransform
          }}>
            <DarkThemeSwitcher />
          </animated.div>
        </div>
      </div>

      <animated.nav
        ref={navBarDOM}
        style={{
          opacity: forthAppearing.opacity,
          top: isFixed ? menuTop : 'initial'
        }}
        className={isFixed ? styles.fixedNavContainer : styles.navContainer}
      >
        <HeadNavigationDesktop onMenuOpenChange={setMenuOpen} />
      </animated.nav>
    </header>
  )
}

export default HeaderDesktop