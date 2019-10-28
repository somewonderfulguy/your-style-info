import React, {memo} from 'react'
import {func, object, string} from 'prop-types'

import LinkExtended from '../../../LinkExtended'
import styles from './RootMenu.module.css'

const propTypes = {
  routes: object.isRequired,
  setShowMenu: func.isRequired,
  setSubMenu: func.isRequired,
  activeMenuItem: string,
  setActiveMenuItem: func,
  clearActiveMenuItem: func
}

const defaultProps = {
  activeMenuItem: null,
  setActiveMenuItem: () => {},
  clearActiveMenuItem: () => {}
}

const RootMenu = ({routes, setShowMenu, setSubMenu, activeMenuItem, clearActiveMenuItem, setActiveMenuItem}) => {
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
              if(sub) {
                setShowMenu(true)
                setSubMenu({
                  content: sub,
                  basePath: path,
                  mainThumbnail: thumbnail,
                })
              }
              setActiveMenuItem(name)
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