import React, {memo} from 'react'
import {bool, object, string} from 'prop-types'
import {animated, useSpring, useTransition} from 'react-spring'

import LinkExtended from '../../../LinkExtended'
import styles from './SubMenu.module.css'

const propTypes = {
  content: object,
  basePath: string,
  isOpen: bool,
  openNowAndBefore: bool
}

const defaultProps = {
  basePath: '',
  isOpen: false,
  openNowAndBefore: false
}

const SubMenu = ({content, basePath, isOpen, openNowAndBefore}) => {
  // old transitions clean up
  const transitionCancelArray = React.useRef([])
  transitionCancelArray.current.forEach((item, idx) => idx > 1 && item())
  transitionCancelArray.current.splice(2)

  // fade out / in
  const transitions = useTransition(content, basePath, {
    config: {duration: openNowAndBefore ? 400 : 0},
    from: {opacity: 0},
    enter: item => async (next, cancel) => {
      transitionCancelArray.current = [cancel, ...transitionCancelArray.current]
      await next({opacity: 1})
    },
    leave: {opacity: 0}
  })

  // transform animation
  const {transform} = useSpring({
    from: {transform: `translate3d(0, -10px, 0)`},
    to: {transform: `translate3d(0, ${isOpen ? 0 : -10}px, 0)`}
  })

  const renderList = content => {
    const paths = Object.keys(content)
    const values = Object.values(content)

    return (
      values.map((value, i) => {
        const {name, /*thumbnail,*/ inactive} = value

        return (
          <li key={name} className={styles.listItem} submenupersist="1">
            <LinkExtended to={basePath + paths[i]} inactive={inactive}>
              {name}
            </LinkExtended>
          </li>
        )
      })
    )
  }

  return (
    <div className={styles.subMenu} submenupersist="1">
      <div style={{position: 'relative'}}>
        {
          transitions.map(({item, props: {opacity}, key, state}) => {
            const range = [0, 0.33, 0.66, 1]
            let op = opacity
            switch(state) {
              case 'enter':
                op = opacity.interpolate({range, output: [0, 0, 0, 1]})
                break
              case 'leave':
                op = opacity.interpolate({range, output: [1, 0, 0, 0]})
                break
              default:
                op = opacity
                break
            }

            const style = {
              opacity: op,
              position: state === 'leave' ? 'absolute' : 'initial',
              zIndex: state === 'leave' ? '-1' : '1'
            }

            return (
              <animated.div
                key={key}
                style={{...style, transform}}
                className={styles.listContainer}
              >
                <ul className={styles.list}>
                  {renderList(item)}
                </ul>
                <img src="/img/outerwear.jpg" alt="" className={styles.image} />
              </animated.div>
            )
          })
        }
      </div>
    </div>
  )
}

SubMenu.propTypes = propTypes
SubMenu.defaultProps = defaultProps

export default memo(SubMenu)