import React, {useState} from 'react'

import SubMenu from './SubMenu'
import LinkExtended from '../../LinkExtended'
import {PRIME_ROUTES} from '../../../constants'
import styles from './HeadNavigation.module.css'

const HeadNavigation = () => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false)
  const [subMenuContent, setSubMenuContent] = useState(null)

  const renderLinks = (routes, previousPath = '') => {
    const keys = [...routes.keys()]
    const values = [...routes.values()]

    return (
      <ul className={styles.list}>
        {values.map((value, i) => {
          const path = previousPath + keys[i]
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
                setIsSubMenuVisible(true)
                setSubMenuContent(value.routes)
              })}
              onMouseLeave={isWithSubmenu && (() => {
                setIsSubMenuVisible(false)
              })}
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

  return (
    <nav>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          {renderLinks(PRIME_ROUTES)}
        </div>
      </div>
      {(isSubMenuVisible && subMenuContent) && (
        <div
          className={styles.subMenuContainer}
          onMouseEnter={() => setIsSubMenuVisible(true)}
          onMouseLeave={() => setIsSubMenuVisible(false)}
        >
          <SubMenu pathTitlePairs={subMenuContent} />
        </div>
      )}
    </nav>
  )
}

export default HeadNavigation