import LinkExtended from '~components/LinkExtended'
import { PRIME_ROUTES } from '~constants/index'
import { useLocalization } from '~contexts/localizationContext'
import classNames from '~shared/utils/classNames'

import styles from './FooterNavigation.module.css'

type Props = {
  isSmaller: boolean
}

const FooterNavigation = ({ isSmaller }: Props) => {
  const [{ locale }, , { data: translations }] = useLocalization()

  return (
    <nav>
      <ul
        className={classNames(
          !isSmaller && styles.list,
          isSmaller && styles.listShrank
        )}
      >
        {Object.entries(PRIME_ROUTES) &&
          Object.entries(PRIME_ROUTES).map(([path, { name, inactive }]) => (
            <li key={path}>
              {inactive ? (
                <span className={styles.inactive} aria-disabled>
                  {translations?.navigation[path] ?? name}
                </span>
              ) : (
                <LinkExtended
                  to={`/${locale}${path}`}
                  className={styles.link}
                  activeClassName={styles.active}
                >
                  {translations?.navigation[path] ?? name}
                </LinkExtended>
              )}
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default FooterNavigation
