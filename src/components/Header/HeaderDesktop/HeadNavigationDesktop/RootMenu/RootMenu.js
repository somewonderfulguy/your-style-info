import React, {memo} from 'react'
import {func, string} from 'prop-types'

import {PRIME_ROUTES} from '../../../../../constants'
import LinkExtended from '../../../../LinkExtended'
import styles from './RootMenu.module.css'

const propTypes = {
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

const RootMenu = ({setShowMenu, setSubMenu, activeMenuItem, clearActiveMenuItem, setActiveMenuItem}) => (
  <ul className={styles.list}>
    {Object.entries(PRIME_ROUTES).map(([path, {name, sub, inactive, thumbnail}]) => (
      <li
        className={
          inactive 
            ? styles.listItemInactive
            : activeMenuItem === name ? styles.listItemActive : styles.listItem
        }
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
    ))}
  </ul>
)

RootMenu.propTypes = propTypes
RootMenu.defaultProps = defaultProps

export default memo(RootMenu)