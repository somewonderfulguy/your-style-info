import React, {useReducer, useState} from 'react'
import {animated, config, useSpring} from 'react-spring'

import RootMenu from './RootMenu'
import SubMenu from './SubMenu'
import {PRIME_ROUTES} from '../../../constants'
import {useResizeObserver} from '../../../helpers/hooks'
import styles from './HeadNavigation.module.css'

// DO I NEED REDUCER????????????
// can I replace prevIsOpen with usePrevious?
// can I replace openNowAndBefore with just a variable?
const openMenuInitialState = {
  isOpen: false,
  prevIsOpen: false,
  openNowAndBefore: false
}

const openMenuReducer = (state, action) => ({
  isOpen: action,
  prevIsOpen: state.isOpen,
  openNowAndBefore: state.isOpen === action
})

const HeadNavigation = () => {
  const [openMenuState, setMenuOpen] = useReducer(openMenuReducer, openMenuInitialState)

  const [subMenuContent, setSubMenuContent] = useState({
    pathTitlePairs: new Map(),
    basePath: ''
  })

  // drop-down fade-in-out animation
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

  // drop-down menu height animation
  const [bindResizeObserver, {height: heightElem}] = useResizeObserver()
  const {height} = useSpring({
    config: openMenuState.openNowAndBefore ? config.default : {duration: 0}, // TODO I did not needed this before!
    from: {height: 'auto'},
    to: {height: openMenuState.isOpen ? heightElem : 'auto'}
  })

  return (
    <nav>
      <div className={styles.menuWrapper}>
        <div className={styles.menuContainer}>
          <RootMenu
            routes={PRIME_ROUTES}
            setShowMenu={setMenuOpen}
            setSubMenuContent={setSubMenuContent}
          />
        </div>
      </div>

      <animated.div
        style={{
          opacity,
          visibility: opacity.interpolate(o => o > 0.3 ? 'visible' : 'hidden'),
          height
        }}
        className={styles.subMenuContainer}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div ref={bindResizeObserver} submenupersist="1">
          <SubMenu
            pathTitlePairs={subMenuContent.pathTitlePairs}
            basePath={subMenuContent.basePath}
            isOpen={openMenuState.isOpen}
          />
        </div>
      </animated.div>
    </nav>
  )
}

export default HeadNavigation