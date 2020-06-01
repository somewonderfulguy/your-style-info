import React, {memo} from 'react'
import {useRouteMatch} from 'react-router-dom'
import {func, string} from 'prop-types'

import {PRIME_ROUTES} from 'constants/index'
import LinkExtended from 'components/LinkExtended'
import styles from './RootMenu.module.css'

const propTypes = {
  setShowMenu: func.isRequired,
  setSubMenu: func.isRequired,
  activeMenuItem: string,
  setActiveMenuItem: func,
  clearActiveMenuItem: func,
  setRootMenuOpen: func
}

const defaultProps = {
  activeMenuItem: null,
  setActiveMenuItem: () => {},
  clearActiveMenuItem: () => {},
  setRootMenuOpen: () => {}
}

const RootMenu = ({
  setShowMenu, setSubMenu, activeMenuItem, clearActiveMenuItem, setActiveMenuItem, setRootMenuOpen
}) => {
  const routeMatch = useRouteMatch('/:locale')
  const locale = routeMatch.params.locale

  return (
    <ul className={styles.list}>
      {Object.entries(PRIME_ROUTES).map(([path, {name, sub, inactive, thumbnail}], i) => (
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
          submenupersist={sub ? 1 : 0}
          aria-haspopup={!!sub}
          aria-expanded={activeMenuItem === name}
        >
          <LinkExtended
            // FIXME that's weeeeird implement in other way
            to={`/${locale}${path}`}
            className={inactive ? '' : styles.link}
            activeClassName={styles.activeLink}
            inactive={inactive}
            submenupersist={sub ? 1 : 0}
            onFocus={() => setRootMenuOpen(true)}
          >
            {name}
          </LinkExtended>
        </li>
      ))}
    </ul>
  )
}

RootMenu.propTypes = propTypes
RootMenu.defaultProps = defaultProps

export default memo(RootMenu)