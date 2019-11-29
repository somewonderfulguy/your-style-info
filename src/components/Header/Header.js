import React, {useContext, useRef, useState} from 'react'
import {animated, useSpring} from 'react-spring'
import {useTranslation} from 'react-i18next'

import {useAnimatedAppearing, useStickyNavBar} from './hooks'
import {ScreenWidthContext} from '../../ApplicationNode'
import HamburgerIcon from './HamburgerIcon'
import HeadNavigationDesktop from './HeadNavigationDesktop'
import HeadNavigationMobile from './HeadNavigationMobile'
import LangSelector from '../LangSelector'
import styles from './Header.module.css'

const Header = () => {
  const isDesktop = useContext(ScreenWidthContext) > 1024 // FIXME - doesn't work properly
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const {t} = useTranslation('', {useSuspense: false})
  const headerDomRef = useRef(null)

  const {
    desktopSprings: [desktopTitleAppearing, desktopSubTitleAppearing, desktopMenuAppearing],
    mobileSpring
  } = useAnimatedAppearing()

  // show on scroll-up logic
  const navbarRef = React.useRef(null)
  const navbarHeight = navbarRef.current && (navbarRef.current.offsetHeight || 0)
  const {isFixed, isShown} = useStickyNavBar(navbarRef.current)

  // animate menu on scroll up
  const {top: menuTop} = useSpring({
    config: {duration: 200},
    top: isShown ? -1 : navbarHeight * -1
  })

  const paddingDesktop = isDesktop ? {paddingBottom: navbarHeight} : {}

  return (
    <>
      <animated.header
        className={styles.header}
        style={{...paddingDesktop, ...mobileSpring}}
        ref={headerDomRef}
      >
        <div className={styles.langContainer}>
          {isDesktop && <LangSelector />}
        </div>

        <div className={styles.hgroup}>
          <animated.h1 className={styles.title} style={desktopTitleAppearing}>
            Your Style
          </animated.h1>
          {/* TODO use HTML text block instead of div */}
          <animated.div className={styles.subtitle} style={desktopSubTitleAppearing}>
            {t('subtitle')}
          </animated.div>
        </div>

        <animated.nav
          ref={navbarRef}
          style={{
            opacity: desktopMenuAppearing.opacity,
            top: isFixed ? menuTop : 'initial'
          }}
          className={isFixed ? styles.fixedNavContainer : styles.navContainer}
        >
          {isDesktop ? (
            <HeadNavigationDesktop />
          ) : (
            <div className={styles.hamburgerContainer}>
              {/* excessive wrapper to fix triggering click event around the button */}
              <div onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                <HamburgerIcon isOpen={isMobileMenuOpen} />
              </div>
            </div>
          )}
        </animated.nav>
      </animated.header>

      {/* Moved outside because animated header (transform) breaks position: fixed for child elements */}
      {!isDesktop 
        && <HeadNavigationMobile isOpen={isMobileMenuOpen} menuHeight={headerDomRef.current ? headerDomRef.current.offsetHeight : 0} />
      }
    </>
  )
}

export default Header