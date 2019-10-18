import React from 'react'
import {bool, object, string} from 'prop-types'
import {animated, useSpring, useTransition} from 'react-spring'

import LinkExtended from '../../../LinkExtended'
import {usePrevious} from '../../../../helpers/hooks'
import styles from './SubMenu.module.css'

const propTypes = {
  content: object,
  basePath: string,
  isOpen: bool
}

const defaultProps = {
  basePath: '',
  isOpen: false
}

// TODO fix: opacity tranistions from 0 to 1 when user opens first time - must be fixed, fade in/out when user goes to the closest menu item with drop-down
const SubMenu = ({content, basePath, isOpen}) => {
  // --- might be replaced with prop from parent ---
  const prevOpen = usePrevious(isOpen)

  // fade out / in
  //SHOULD I MOVE TRANSITION UPPER?
  const transitions = useTransition(content, basePath, {
    // TODO FIX NEEDED if you set 14000ms as duration and try to open menu many times you will notice that a lot of DOM models will be opened
    // either cancel animation for old blocks or set display: none; to all of them (better to cancel)
    config: {duration: isOpen && prevOpen ? 400 : 0}, // --- isOpen && prevOpen might be replaced with prop from parent ---
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0}

    // TODO might be used this way, bugs are spotted, so maybe even needed to use functions with await, try to implement this way
    /*enter: [
      {opacity: 0},
      {opacity: 0},
      {opacity: 0},
      {opacity: 1},
    ],
    leave: [
      {opacity: 1},
      {opacity: 0},
      {opacity: 0},
      {opacity: 0},
    ]*/
  })

  // transform animation
  const {transform} = useSpring({
    from: {transform: `translate3d(0, -10px, 0)`},
    to: {
      transform: `translate3d(0, ${isOpen ? 0 : -10}px, 0)`
    }
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

export default React.memo(SubMenu)