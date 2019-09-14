import React from 'react'

import LinkExtended from '../../LinkExtended'
import {PRIME_ROUTES} from '../../../constants'
import styles from './HeadNavigation.module.css'

const HeadNavigation = () => {
  const renderLinks = (routes, previousPath = '') => {
    const keys = [...routes.keys()]
    const values = [...routes.values()]

    return  (
      <ul>
        {values.map((value, i) => {
          const path = previousPath + keys[i]
          
          return (
            <li key={path}>
              <LinkExtended to={path} activeClassName={styles.active}>
                {typeof value === 'string' ? value : value.name}
              </LinkExtended>
              {typeof value !== 'string' && (
                <div className="sub-menu">{renderLinks(value.routes, path)}</div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <nav>{renderLinks(PRIME_ROUTES)}</nav>
  )
}

export default HeadNavigation