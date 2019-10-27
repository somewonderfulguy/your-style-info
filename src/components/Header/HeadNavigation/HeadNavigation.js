import React, {useReducer} from 'react'
import {animated, config, useSpring} from 'react-spring'

import RootMenu from './RootMenu'
import SubMenu from './SubMenu'
import {ROOT_MENU_THUMBS, PRIME_ROUTES} from '../../../constants'
import {imgPreload} from '../../../utils'
import {useResizeObserver} from '../../../helpers/hooks' // TODO -- use debounce
import styles from './HeadNavigation.module.css'

const openMenuInitialState = {
  isOpen: false,
  openNowAndBefore: false
}

const openMenuReducer = (state, action) => ({
  isOpen: action,
  openNowAndBefore: state.isOpen && action
})

const HeadNavigation = () => {
  const [openMenuState, setMenuOpen] = useReducer(openMenuReducer, openMenuInitialState)

  const [subMenuContent, setSubMenuContent] = React.useState({
    content: {},
    basePath: '',
    mainThumbnail: null,
    activeMenuItem: null
  })

  const clearActiveMenuItem = () => setSubMenuContent({...subMenuContent, activeMenuItem: null})

  const closeMenu = e => {
    if(e.relatedTarget.getAttribute && e.relatedTarget.getAttribute('submenupersist') === '1') return
    setMenuOpen(false)
    clearActiveMenuItem()
  }

  // preload root thumbs
  React.useEffect(() => {imgPreload(ROOT_MENU_THUMBS)}, [])

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
      <div className={styles.rootMenuContainer}>
        <RootMenu
          routes={PRIME_ROUTES}
          setShowMenu={setMenuOpen}
          setSubMenu={setSubMenuContent}
          activeMenuItem={subMenuContent.activeMenuItem}
          clearActiveMenuItem={clearActiveMenuItem}
        />
        
        {/* MS Edge fix - absolutely positioned bottom border */}
        <div className={styles.borderBottom} submenupersist="1" onMouseLeave={e => closeMenu(e)} />
      </div>

      <animated.div
        style={{
          opacity,
          visibility: opacity.interpolate(o => o > 0.3 ? 'visible' : 'hidden'),
          height
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

export default HeadNavigation