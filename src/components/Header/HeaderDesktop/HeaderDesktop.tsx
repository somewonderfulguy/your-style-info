import { useEffect, useRef, useState } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'

import DarkThemeSwitcher from '~components/DarkThemeSwitcher'
import LangSelector from '~components/LangSelector'
import SocialMediaIcons from '~components/SocialMediaIcons'
import { useLocalization } from '~contexts/localizationContext'
import { useHeaderHeightDispatch } from '~contexts/headerHeightContext'

import { useAnimatedAppearing } from './hooks'
import { useStickyNavBar } from '../hooks'
import HeadNavigationDesktop from './HeadNavigationDesktop'

import styles from './HeaderDesktop.module.css'

const HeaderDesktop = () => {
  const [, , { data: translations }] = useLocalization()
  const {
    appearingSprings: [
      firstAppearing,
      secondAppearing,
      thirdAppearing,
      forthAppearing
    ]
  } = useAnimatedAppearing()

  const setHeaderHeight = useHeaderHeightDispatch()

  const navBarDOM = useRef<HTMLElement>(null)
  const headerDOM = useRef<HTMLElement>(null)

  const headerHeight = headerDOM.current?.offsetHeight ?? 0
  const navbarHeight = navBarDOM.current?.offsetHeight ?? 0
  const [navBarTopLine, setNavBarTopLine] = useState(0)

  useEffect(() => {
    headerDOM.current && setNavBarTopLine(headerDOM.current.offsetHeight)
  }, [setNavBarTopLine])

  useEffect(() => {
    setHeaderHeight(headerHeight)
    return () => setHeaderHeight(0)
  }, [headerHeight, setHeaderHeight])

  // show on scroll-up logic
  const [isRootMenuOpen, setRootMenuOpen] = useState(false)
  const [persistRootMenu, setPersistRootMenu] = useState(false)
  const navBarState = useStickyNavBar(
    navBarTopLine + (persistRootMenu ? 0 : navbarHeight),
    navBarTopLine
  )
  const { isFixed, isShown } = navBarState
  useEffect(() => void setRootMenuOpen(false), [navBarState])

  // animate menu on scroll up
  const { top: menuTop } = useSpring({
    config: { duration: 200 },
    top: isShown || isRootMenuOpen || persistRootMenu ? -1 : navbarHeight * -1
  })

  const subtitleSelector = 'subtitle'
  const transitions = useTransition(translations?.subtitle, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  return (
    <header
      className={styles.header}
      style={{ paddingBottom: navbarHeight }}
      ref={headerDOM}
    >
      <div className={styles.grid}>
        <div className={styles.aboveNav}>
          <div>
            <animated.h1 className={styles.title} style={firstAppearing}>
              Your Style
            </animated.h1>
            <animated.p
              className={styles.subtitleContainer}
              style={secondAppearing}
            >
              {transitions.map(
                ({ item, key, props }) =>
                  item !== subtitleSelector && (
                    <animated.span
                      key={key}
                      style={props}
                      className={styles.subtitle}
                    >
                      {item as string}
                    </animated.span>
                  )
              )}
            </animated.p>
          </div>
          <div className={styles.sideControlsContainer}>
            <animated.div
              style={{
                opacity: secondAppearing.opacity,
                transform: secondAppearing.reverseTransform,
                zIndex: 1
              }}
            >
              <LangSelector />
            </animated.div>
            <animated.div
              style={{
                opacity: thirdAppearing.opacity,
                transform: thirdAppearing.reverseTransform
              }}
            >
              <SocialMediaIcons small color="lightgray" />
            </animated.div>
            <animated.div
              className={styles.sideControlsDarkTheme}
              style={{
                opacity: forthAppearing.opacity,
                transform: forthAppearing.reverseTransform
              }}
            >
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
          onMouseEnter={() => setPersistRootMenu(true)}
          onMouseLeave={() => setPersistRootMenu(false)}
        >
          <HeadNavigationDesktop
            setRootMenuOpen={setRootMenuOpen}
            setPersistRootMenu={setPersistRootMenu}
          />
        </animated.nav>
      </div>
    </header>
  )
}

export default HeaderDesktop
