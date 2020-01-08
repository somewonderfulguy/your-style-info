import React from 'react'

import LinkExtended from '../../LinkExtended'
import {PRIME_ROUTES} from '../../../constants'
import styles from './FooterNavigation.module.css'

const FooterNavigation = () => (
  <nav>
    <ul className={styles.list}>
      {Object.entries(PRIME_ROUTES) && Object.entries(PRIME_ROUTES).map(([path, {name, inactive}]) => (
        <li key={path}>
          {inactive ? (
            <span className={styles.inactive}>{name}</span>
          ) : (
            <LinkExtended to={path} className={styles.link} activeClassName={styles.active}>
              {name}
            </LinkExtended>
          )}
        </li>
      ))}
    </ul>
  </nav>
)

export default FooterNavigation