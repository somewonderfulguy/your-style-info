import React, {Fragment, memo, useState, useRef} from 'react'
import {object, string} from 'prop-types'
import {animated, useTransition} from 'react-spring'

import LinkExtended from '../../../../LinkExtended'
import styles from './SubMenuContent.module.css'

const propTypes = {
  menuItems: object.isRequired,
  basePath: string,
  mainThumbnailUrl: string,
}

const defaultProps = {
  basePath: '',
  mainThumbnailUrl: null
}

const SubMenuContent = ({menuItems, basePath, mainThumbnailUrl}) => {
  const [subItemThumbnailUrl, setSubItemThumbnailUrl] = useState(null)

  // old transitions clean up
  const transitionCancelArray = useRef([])
  transitionCancelArray.current.forEach((item, idx) => idx >= 1 && item())
  transitionCancelArray.current.splice(2)

  const transitions = useTransition(subItemThumbnailUrl || mainThumbnailUrl, null, {
    config: {duration: 200},
    from: {opacity: 0},
    enter: () => async (next, cancel) => {
      transitionCancelArray.current.unshift(cancel)
      await next({opacity: 1})
    },
    leave: {opacity: 0}
  })

  const renderList = menuItems => {
    const paths = Object.keys(menuItems)
    const values = Object.values(menuItems)

    return (
      values.map((value, i) => {
        const {name, thumbnail, inactive} = value

        return (
          <li
            key={name}
            className={styles.listItem}
          >
            <LinkExtended
              to={basePath + paths[i]}
              inactive={inactive}
              className={styles.link}
              onMouseEnter={() => thumbnail && setSubItemThumbnailUrl(thumbnail)}
              onMouseLeave={() => thumbnail && setSubItemThumbnailUrl(null)}
            >
              {name}
            </LinkExtended>
          </li>
        )
      })
    )
  }

  return (
    <>
      <ul className={styles.list}>
        {renderList(menuItems)}
      </ul>

      {transitions.map(({item, key, props}) => (
        <Fragment key={key}>
          <div className={styles.heightFill} /> 
          <animated.img
            src={item}
            style={props}
            className={styles.image}
            alt=""
          />
        </Fragment>
      ))}
    </>
  )
}

SubMenuContent.propTypes = propTypes
SubMenuContent.defaultProps = defaultProps

export default memo(SubMenuContent)