import React from 'react'
import {Link} from 'react-router-dom'

import {primeRoutes} from '../../../constants'

const HeadNavigation = () => {
  const renderLinks = routes => {
    const keys = [...routes.keys()]
    const values = [...routes.values()]

    return  (
      <ul>
        {values.map((value, i) => (
          <li key={keys[i]}>
            <Link to={keys[i]}>
              {typeof value === 'string' ? value : value.name}
            </Link>
            {typeof value !== 'string' && (
              <div className="sub-menu">{renderLinks(value.routes)}</div>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <nav>{renderLinks(primeRoutes)}</nav>
  )
}

export default HeadNavigation