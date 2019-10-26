import React, {memo} from 'react'
import {func, object, string} from 'prop-types'

import LinkExtended from '../../../LinkExtended'
import styles from './RootMenu.module.css'

const propTypes = {
  routes: object.isRequired,
  setShowMenu: func.isRequired,
  setSubMenu: func.isRequired,
  activeMenuItem: string,
  clearActiveMenuItem: func
}

const defaultProps = {
  activeMenuItem: null,
  clearActiveMenuItem: () => {}
}

const RootMenu = ({routes, setShowMenu, setSubMenu, activeMenuItem, clearActiveMenuItem}) => {
  const paths = Object.keys(routes)
  const menuItems = Object.values(routes)

  return (
    <ul className={styles.list}>
      {menuItems.map((item, idx) => {
        const path = paths[idx]
        const {name, sub, inactive, thumbnail} = item

        const className = inactive 
          ? styles.listItemInactive
          : styles.listItem + (activeMenuItem === name ? ` ${styles.listItemActive}` : '')

        return (
          <li
            className={className}
            key={path}
            onMouseEnter={() => {
              sub && setShowMenu(true)
              setSubMenu({
                content: sub || {},
                basePath: sub ? path : '',
                mainThumbnail: sub ? thumbnail : null,
                activeMenuItem: name
              })
            }}
            onMouseLeave={e => {
              if(e.relatedTarget.getAttribute && e.relatedTarget.getAttribute('submenupersist') === '1') return
              setShowMenu(false)
              clearActiveMenuItem()
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
RootMenu.defaultProps = defaultProps

export default memo(RootMenu)