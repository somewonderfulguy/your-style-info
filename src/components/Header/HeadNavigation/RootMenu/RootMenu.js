import React, {memo} from 'react'
import {func, object} from 'prop-types'

import LinkExtended from '../../../LinkExtended'
import styles from './RootMenu.module.css'

const propTypes = {
  routes: object.isRequired,
  setShowMenu: func.isRequired,
  setSubMenu: func.isRequired
}

const RootMenu = ({routes, setShowMenu, setSubMenu}) => {
  const paths = Object.keys(routes)
  const menuItems = Object.values(routes)

  return (
    <ul className={styles.list}>
      {menuItems.map((item, idx) => {
        const path = paths[idx]
        const {name, sub, inactive, thumbnail} = item

        return (
          <li
            className={inactive ? styles.listItemInactive : styles.listItem}
            key={path}
            onMouseEnter={sub && (() => {
              setShowMenu(true)
              setSubMenu({
                content: sub,
                basePath: path,
                mainThumbnail: thumbnail
              })
            })}
            onMouseLeave={e => {
              if(e.relatedTarget.getAttribute && e.relatedTarget.getAttribute('submenupersist') === '1') return
              setShowMenu(false)
            }}
            submenupersist={!!sub ? 1 : 0}
          >
            <LinkExtended
              to={path}
              className={inactive ? '' : styles.link}
              activeClassName={styles.activeLink}
              inactive={inactive}
              submenupersist={!!sub ? 1 : 0}
            >
              {name}
            </LinkExtended>
          </li>
        )
      })}
    </ul>
  )
}

RootMenu.propTypes = propTypes

export default memo(RootMenu)