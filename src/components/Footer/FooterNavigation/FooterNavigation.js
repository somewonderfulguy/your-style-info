import React from 'react'

import LinkExtended from 'components/LinkExtended'
import {PRIME_ROUTES} from 'constants/index'
import {useLocalisation} from 'contexts'
import styles from './FooterNavigation.module.css'

const FooterNavigation = () => {
  const {locale} = useLocalisation()

  return (
    <nav>
      <ul className={styles.list}>
        {Object.entries(PRIME_ROUTES) && Object.entries(PRIME_ROUTES).map(([path, {name, inactive}]) => (
          <li key={path}>
            {inactive ? (
              <span className={styles.inactive} aria-disabled>{name}</span>
            ) : (
              <LinkExtended to={`/${locale}${path}`} className={styles.link} activeClassName={styles.active}>
                {name}
              </LinkExtended>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterNavigation