import React from 'react'
import {Link} from 'react-router-dom'

import {PRIME_ROUTES} from '../../../constants'

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
              <Link to={path}>
                {typeof value === 'string' ? value : value.name}
              </Link>
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