import React, {useReducer} from 'react'
import {animated, config, useSpring} from 'react-spring'

import RootMenu from './RootMenu'
import SubMenu from './SubMenu'
import {PRIME_ROUTES} from '../../../constants'
import {useResizeObserver} from '../../../helpers/hooks' // TODO -- use debounce
import styles from './HeadNavigation.module.css'

const openMenuInitialState = {
  isOpen: false,
  openNowAndBefore: false
}

const subMenuContentInitialState = {
  content: {},
  basePath: '',
  mainThumbnailUrl: null,
  subItemThumbnailUrl: null
}

const openMenuReducer = (state, action) => ({
  isOpen: action,
  openNowAndBefore: state.isOpen && action
})

const subMenuContentReducer = (state, action) => {
  switch(action.type) {
    case 'set-submenu':
      return {
        content: action.content,
        basePath: action.basePath,
        mainThumbnailUrl: action.mainThumbnailUrl || null,
        subItemThumbnailUrl: null
      }
    case 'set-sumItemThumbnail':
      return {...state, subItemThumbnailUrl: action.subItemThumbnailUrl}
    default:
      return state
  }
}

const HeadNavigation = () => {
  const [openMenuState, setMenuOpen] = useReducer(openMenuReducer, openMenuInitialState)
  const [subMenuContent, setSubMenuContent] = useReducer(subMenuContentReducer, subMenuContentInitialState)

  const setSubMenu = (content, basePath, mainThumbnailUrl = null) => 
    setSubMenuContent({
      type: 'set-submenu',
      content,
      basePath,
      mainThumbnailUrl
    })

  /*const setSubItemThumbnail = (subItemThumbnailUrl = null) => 
    setSubMenuContent({
      type: 'set-submenu',
      subItemThumbnailUrl
    })*/

  // drop-down fade-in-out
  const {opacity} = useSpring({
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
  const [bindResizeObserver, {height: heightElem}] = useResizeObserver()
  const {height} = useSpring({
    config: openMenuState.openNowAndBefore ? config.default : {duration: 0},
    from: {height: 'auto'},
    to: {height: openMenuState.isOpen ? heightElem : 'auto'}
  })

  return (
    <>
      <div className={styles.menuWrapper}>
        <div className={styles.menuContainer}>
          <RootMenu
            routes={PRIME_ROUTES}
            setShowMenu={setMenuOpen}
            setSubMenu={setSubMenu}
          />
        </div>
      </div>

      <animated.div
        style={{
          opacity,
          visibility: opacity.interpolate(o => o > 0.3 ? 'visible' : 'hidden'),
          height,
          minHeight: 160 // TODO when release put real value
        }}
        className={styles.subMenuContainer}
        //onMouseLeave={() => setMenuOpen(false)}
      >
        {/* TODO try to put it either animated.div or SubMenu */}
        <div ref={bindResizeObserver} submenupersist="1">
          <SubMenu
            content={subMenuContent.content}
            basePath={subMenuContent.basePath}
            isOpen={openMenuState.isOpen}
            openNowAndBefore={openMenuState.openNowAndBefore}
          />
        </div>
      </animated.div>
    </>
  )
}

export default HeadNavigation