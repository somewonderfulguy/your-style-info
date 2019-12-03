import React, {memo} from 'react'
import {bool, object, string} from 'prop-types'
import {animated, useSpring, useTransition} from 'react-spring'

import SubMenuContent from './SubMenuContent'
import styles from './SubMenu.module.css'

const propTypes = {
  content: object,
  basePath: string,
  isOpen: bool,
  openNowAndBefore: bool,
  mainThumbnail: object
}

const defaultProps = {
  content: {},
  basePath: '',
  isOpen: false,
  openNowAndBefore: false,
  mainThumbnail: null
}

const SubMenu = ({content, basePath, isOpen, openNowAndBefore, mainThumbnail}) => {
  // old transitions clean up
  const transitionCancelArray = React.useRef([])
  transitionCancelArray.current.forEach((cancel, idx) => idx >= 1 && cancel())
  transitionCancelArray.current.splice(2)

  // fade out / in submenu content
  const transitions = useTransition(content, basePath, {
    config: {duration: openNowAndBefore ? 400 : 0},
    from: {opacity: 0},
    enter: () => async (next, cancel) => {
      transitionCancelArray.current.unshift(cancel)
      await next({opacity: 1})
    },
    leave: {opacity: 0}
  })

  // transform animation when open / close submenu
  const {transform} = useSpring({
    from: {transform: `translate3d(0, -10px, 0)`},
    to: {transform: `translate3d(0, ${isOpen ? 0 : -10}px, 0)`}
  })

  return (
    <div className={styles.subMenu} submenupersist="1">
      {transitions.map(({item: menuItems, props: {opacity: opacityTransition}, key, state}) => {
        const range = [0, 0.33, 0.66, 1]
        
        let opacity = opacityTransition
        switch(state) {
          case 'enter':
            opacity = opacityTransition.interpolate({range, output: [0, 0, 0, 1]})
            break
          case 'leave':
            opacity = opacityTransition.interpolate({range, output: [1, 0, 0, 0]})
            break
          default:
            break
        }

        return (
          <animated.div
            key={key}
            className={state === 'leave' ? styles.listContainerLeaving : styles.listContainer}
            style={{
              opacity: typeof opacity.value !== 'undefined' && isNaN(opacity.value) // when menu opens / closes opacity.value sometimes becomes NaN and a warning in console happens - this is a simple fix
                ? 1
                : opacity,
              transform
            }}
          >
            <SubMenuContent
              menuItems={menuItems}
              mainThumbnail={mainThumbnail}
              isOpen={isOpen}
              basePath={basePath}
            />
          </animated.div>
        )
      })}
    </div>
  )
}

SubMenu.propTypes = propTypes
SubMenu.defaultProps = defaultProps

export default memo(SubMenu)