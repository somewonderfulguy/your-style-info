import React, {useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState} from 'react'
import {func} from 'prop-types'
import {animated, useSpring, useTransition} from 'react-spring'

import RootMenu from './RootMenu'
import SubMenu from './SubMenu'
import {ROOT_MENU_THUMBS} from 'constants/index'
import {useLocalization} from 'contexts'
import {imgPreload} from 'shared/utils'
import {useResizeObserver} from 'shared/hooks'
import styles from './HeadNavigationDesktop.module.css'

const openMenuInitialState = {
  isOpen: false,
  openNowAndBefore: false
}

const openMenuReducer = (state, action) => ({
  isOpen: action,
  openNowAndBefore: state.isOpen && action
})

const propTypes = {
  setRootMenuOpen: func,
  setPersistRootMenu: func
}

const defaultProps = {
  setRootMenuOpen: () => {},
  setPersistRootMenu: () => {}
}

const HeadNavigation = ({setRootMenuOpen, setPersistRootMenu}) => {
  const [, , {data: translations}] = useLocalization()
  const [openMenuState, setMenuOpen] = useReducer(openMenuReducer, openMenuInitialState)

  const [subMenuContent, setSubMenuContent] = useState({
    content: {},
    basePath: '',
    mainThumbnail: null
  })

  useEffect(() => {
    setPersistRootMenu(openMenuState.isOpen)
  }, [setPersistRootMenu, openMenuState.isOpen])

  const [activeMenuItem, setActiveMenuItem] = useState(null)
  const clearActiveMenuItem = useCallback(() => setActiveMenuItem(null), [])

  const closeMenu = e => {
    if(e.relatedTarget.getAttribute && e.relatedTarget.getAttribute('submenupersist') === '1') return
    setMenuOpen(false)
    clearActiveMenuItem()
  }

  // preload root thumbs
  useEffect(() => void imgPreload(ROOT_MENU_THUMBS), [])

  // drop-down fade-in-out
  const {opacity: subMenuOpacity} = useSpring({
    config: {
      mass: 1,
      tension: 500,
      friction: 26
    },
    from: {
      opacity: 0,
      visibility: 'hidden'
    },
    opacity: openMenuState.isOpen ? 1 : 0
  })

  // drop-down menu height
  const prevHeight = useRef(0)
  const [bindResizeObserver, {height: newSubMenuHeight}] = useResizeObserver()
  useLayoutEffect(() => {prevHeight.current = newSubMenuHeight}, [newSubMenuHeight])
  const {height: subMenuHeight} = useSpring({
    immediate: !openMenuState.openNowAndBefore,
    from: {height: 'auto'},
    to: {
      height: openMenuState.isOpen
        ? newSubMenuHeight
        : prevHeight.current
          ? prevHeight.current
          : 'auto'
    }
  })

  // root menu language transition
  const rootMenuTransitions = useTransition(translations?.navigation, translations?.subtitle, {
    config: {duration: 700},
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0}
  })

  return (
    <>
      <div className={styles.rootMenuContainer}>
        {rootMenuTransitions.map(({item, key, props, state}) => (
          !!item && (
            <animated.div
              className={state === 'leave' ? styles.rootMenuTransitionLeave : ''}
              style={props}
              key={key}
            >
              <RootMenu
                setShowMenu={setMenuOpen}
                setSubMenu={setSubMenuContent}
                activeMenuItem={activeMenuItem}
                setActiveMenuItem={setActiveMenuItem}
                clearActiveMenuItem={clearActiveMenuItem}
                setRootMenuOpen={setRootMenuOpen}
                navigationTranslations={item}
              />
            </animated.div>
          )
        ))}
        <div className={styles.borderBottom} submenupersist="1" onMouseLeave={e => closeMenu(e)} />
      </div>

      <animated.div
        style={{
          opacity: subMenuOpacity,
          visibility: subMenuOpacity.interpolate(o => o > 0.1 ? 'visible' : 'hidden'),
          height: subMenuHeight
        }}
        className={styles.subMenuContainer}
        onMouseLeave={e => closeMenu(e)}
        data-testid="drop-down-navigation"
      >
        <div ref={bindResizeObserver} submenupersist="1">
          <SubMenu
            isOpen={openMenuState.isOpen}
            openNowAndBefore={openMenuState.openNowAndBefore}
            content={subMenuContent.content}
            basePath={subMenuContent.basePath}
            mainThumbnail={subMenuContent.mainThumbnail}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </animated.div>
    </>
  )
}

HeadNavigation.propTypes = propTypes
HeadNavigation.defaultProps = defaultProps

export default HeadNavigation