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
  mainThumbnailUrl: string
}

const defaultProps = {
  basePath: '',
  isOpen: false,
  openNowAndBefore: false,
  mainThumbnailUrl: null
}

const SubMenu = ({content, basePath, isOpen, openNowAndBefore, mainThumbnailUrl}) => {
  // old transitions clean up
  const transitionCancelArray = React.useRef([])
  transitionCancelArray.current.forEach((item, idx) => idx >= 1 && item())
  transitionCancelArray.current.splice(2)

  // fade out / in
  const transitions = useTransition(content, basePath, {
    config: {duration: openNowAndBefore ? 400 : 0},
    from: {opacity: 0},
    enter: () => async (next, cancel) => {
      transitionCancelArray.current.unshift(cancel)
      await next({opacity: 1})
    },
    leave: {opacity: 0}
  })

  // transform animation
  const {transform} = useSpring({
    from: {transform: `translate3d(0, -10px, 0)`},
    to: {transform: `translate3d(0, ${isOpen ? 0 : -10}px, 0)`}
  })

  return (
    <div className={styles.subMenu} submenupersist="1">
      {transitions.map(({item, props: {opacity: opacityTransition}, key, state}) => {
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

        const leaveStyle = {
          position: 'absolute',
          left: 0,
          right: 0,
          zIndex: '-1'
        }

        const style = (state === 'leave') ? {opacity, ...leaveStyle} : {opacity}

        return (
          <animated.div
            key={key}
            style={{...style, transform}}
            className={styles.listContainer}
          >
            <SubMenuContent
              menuItems={item}
              mainThumbnailUrl={mainThumbnailUrl}
              basePath={basePath}
              openNowAndBefore={openNowAndBefore}
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