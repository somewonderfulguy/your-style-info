import React from 'react'
import {instanceOf, func} from 'prop-types'

import LinkExtended from '../../../LinkExtended'
import styles from './RootMenu.module.css'

const propTypes = {
  routes: instanceOf(Map).isRequired,
  setShowMenu: func.isRequired,
  setSubMenuContent: func.isRequired
}

const RootMenu = ({routes, setShowMenu, setSubMenuContent}) => {
  const paths = [...routes.keys()]
  const titleOrSubcontent = [...routes.values()]

  return (
    <ul className={styles.list}>
      {titleOrSubcontent.map((value, i) => {
        const path = paths[i]
        const isWithSubmenu = value.name

        // TODO REFACTOR!!!
        // TODO: temp until all menu items will be active - delete, when it happens
        if(value === 'inactive') {
          return (
            <li key={path} className={styles.listItemInactive}>
              {paths[i]}
            </li>
          )
        }
        
        return (
          <li
            key={path}
            className={styles.listItem}
            onMouseEnter={isWithSubmenu && (() => {
              setShowMenu(true)
              setSubMenuContent({
                pathTitlePairs: value.routes,
                basePath: path
              })
            })}
            onMouseLeave={e => {
              if(e.relatedTarget.getAttribute && e.relatedTarget.getAttribute('submenupersist') === '1') {return}
              setShowMenu(false)
            }}
          >
            <LinkExtended
              to={path}
              className={styles.link}
              activeClassName={styles.activeLink}
              customAttrs={{submenupersist: !!isWithSubmenu ? 1 : 0}}
            >
              {isWithSubmenu ? value.name : value}
            </LinkExtended>
          </li>
        )
      })}
    </ul>
  )
}

RootMenu.propTypes = propTypes

export default React.memo(RootMenu)