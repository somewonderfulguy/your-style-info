import React, {useCallback, useEffect, useReducer, useState} from 'react'
import {func} from 'prop-types'
import {animated, useSpring} from 'react-spring'

import RootMenu from './RootMenu'
import SubMenu from './SubMenu'
import {ROOT_MENU_THUMBS} from 'constants/index'
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
  const [bindResizeObserver, {height: newSubMenuHeight}] = useResizeObserver()
  const {height: subMenuHeight} = useSpring({
    immediate: !openMenuState.openNowAndBefore,
    from: {height: 'auto'},
    to: {height: openMenuState.isOpen ? newSubMenuHeight : 'auto'}
  })

  return (
    <>
      <div className={styles.rootMenuContainer}>
        <RootMenu
          setShowMenu={setMenuOpen}
          setSubMenu={setSubMenuContent}
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
          clearActiveMenuItem={clearActiveMenuItem}
          setRootMenuOpen={setRootMenuOpen}
        />

        {/* MS Edge fix - absolutely positioned bottom border */} {/* FIXME seems like it fixes nothing */}
        <div className={styles.borderBottom} submenupersist="1" onMouseLeave={e => closeMenu(e)} />
      </div>

      <animated.div
        style={{
          opacity: subMenuOpacity,
          visibility: subMenuOpacity.interpolate(o => o > 0.3 ? 'visible' : 'hidden'),
          height: subMenuHeight
        }}
        className={styles.subMenuContainer}
        onMouseLeave={e => closeMenu(e)}
      >
        <div ref={bindResizeObserver} submenupersist="1">
          <SubMenu
            isOpen={openMenuState.isOpen}
            openNowAndBefore={openMenuState.openNowAndBefore}
            content={subMenuContent.content}
            basePath={subMenuContent.basePath}
            mainThumbnail={subMenuContent.mainThumbnail}
          />
        </div>
      </animated.div>
    </>
  )
}

HeadNavigation.propTypes = propTypes
HeadNavigation.defaultProps = defaultProps

export default HeadNavigation