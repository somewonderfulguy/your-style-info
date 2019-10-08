import React from 'react'
import {instanceOf, func} from 'prop-types'

import LinkExtended from '../../../LinkExtended'
import styles from './RootMenu.module.css'

const propTypes = {
  routes: instanceOf(Map).isRequired,
  setSubMenuVisible: func.isRequired,
  setSubMenuContent: func.isRequired
}

const RootMenu = ({routes, setSubMenuVisible, setSubMenuContent}) => {
  const keys = [...routes.keys()]
  const values = [...routes.values()]

  return (
    <ul className={styles.list}>
      {values.map((value, i) => {
        const path = keys[i]
        const isWithSubmenu = value.name

        // TODO: temp until all menu items will be active - delete, when it happens
        if(value === 'inactive') {
          return (
            <li key={path} className={styles.listItemInactive}>
              {keys[i]}
            </li>
          )
        }
        
        return (
          <li
            key={path}
            className={styles.listItem}
            onMouseEnter={isWithSubmenu && (() => {
              setSubMenuVisible(true)
              setSubMenuContent({
                pathTitlePairs: value.routes,
                basePath: path
              })
            })}
            onMouseLeave={() => {setSubMenuVisible(false)}}
          >
            <LinkExtended
              to={path}
              className={styles.link}
              activeClassName={styles.activeLink}
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

export default RootMenu