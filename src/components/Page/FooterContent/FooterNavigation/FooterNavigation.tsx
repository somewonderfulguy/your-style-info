import LinkExtended from '~components/LinkExtended'
import { PRIME_ROUTES } from '~constants/index'
import { useLocalization } from '~contexts/localizationContext'

import styles from './FooterNavigation.module.css'

const FooterNavigation = () => {
  const [{ locale }] = useLocalization()

  return (
    <nav>
      <ul className={styles.list}>
        {Object.entries(PRIME_ROUTES) &&
          Object.entries(PRIME_ROUTES).map(([path, { name, inactive }]) => (
            <li key={path}>
              {inactive ? (
                <span className={styles.inactive} aria-disabled>
                  {name}
                </span>
              ) : (
                <LinkExtended
                  to={`/${locale}${path}`}
                  className={styles.link}
                  activeClassName={styles.active}
                >
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
