import React, {Fragment, memo, useState, useRef} from 'react'
import {bool, object, string} from 'prop-types'
import {animated, useTransition} from 'react-spring'

import LinkExtended from '../../../../LinkExtended'
import {usePrevious} from '../../../../../helpers/hooks'
import styles from './SubMenuContent.module.css'

const propTypes = {
  menuItems: object.isRequired,
  basePath: string,
  mainThumbnail: object,
  isOpen: bool
}

const defaultProps = {
  basePath: '',
  mainThumbnail: null,
  isOpen: false
}

const SubMenuContent = ({menuItems, basePath, mainThumbnail, isOpen}) => {
  const [subItemThumbnail, setSubItemThumbnail] = useState(null)
  const prevOpen = usePrevious(isOpen)

  // old transitions clean up
  const transitionCancelArray = useRef([])
  transitionCancelArray.current.forEach((cancel, idx) => idx >= 1 && cancel())
  transitionCancelArray.current.splice(2)

  const transitions = useTransition(subItemThumbnail || mainThumbnail, item => item && item.url, {
    config: {duration: isOpen !== prevOpen ? 0 : 200},
    from: {opacity: 0},
    enter: () => async (next, cancel) => {
      transitionCancelArray.current.unshift(cancel)
      await next({opacity: 1})
    },
    leave: {opacity: 0}
  })

  return (
    <>
      <ul className={styles.list}>
        {Object.entries(menuItems).map(([path, {name, thumbnail, inactive}]) => (
          <li
            key={name}
            className={styles.listItem}
          >
            <LinkExtended
              to={basePath + path}
              inactive={inactive}
              className={styles.link}
              onMouseEnter={() => thumbnail && setSubItemThumbnail(thumbnail)}
              onMouseLeave={() => thumbnail && setSubItemThumbnail(null)}
            >
              {name}
            </LinkExtended>
          </li>
        ))}
      </ul>

      {transitions.map(({item, key, props}) => (
        <Fragment key={key}>
          <div className={styles.heightFill} /> 
          <animated.img
            src={(item && item.url)}
            className={styles.image}
            style={{...props, background: (item && item.background) || '#7d7d7d4c'}}
            alt={(item && item.alt) || ''}
          />
        </Fragment>
      ))}
    </>
  )
}

SubMenuContent.propTypes = propTypes
SubMenuContent.defaultProps = defaultProps

export default memo(SubMenuContent)