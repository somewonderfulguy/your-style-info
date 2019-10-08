import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring'

import RootMenu from './RootMenu'
import SubMenu from './SubMenu'
import {PRIME_ROUTES} from '../../../constants'
import styles from './HeadNavigation.module.css'

const HeadNavigation = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false)
  const [subMenuContent, setSubMenuContent] = useState({
    pathTitlePairs: new Map(),
    basePath: ''
  })

  const toggle = isSubMenuVisible && !!subMenuContent
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
    opacity: toggle ? 1 : 0
  })

  return (
    <nav>
      <div className={styles.menuWrapper}>
        <div className={styles.menuContainer}>
          <RootMenu
            routes={PRIME_ROUTES}
            setSubMenuVisible={setSubMenuVisible}
            setSubMenuContent={setSubMenuContent}
          />
        </div>
      </div>
      <animated.div
        style={{
          opacity,
          visibility: opacity.interpolate(o => o > 0.3 ? 'visible' : 'hidden')
        }}
        className={styles.subMenuContainer}
        onMouseEnter={() => setSubMenuVisible(true)}
        onMouseLeave={() => setSubMenuVisible(false)}
      >
        <SubMenu
          pathTitlePairs={subMenuContent.pathTitlePairs}
          basePath={subMenuContent.basePath}
        />
      </animated.div>
    </nav>
  )
}

export default HeadNavigation