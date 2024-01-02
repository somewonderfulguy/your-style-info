import { Dispatch, memo, SetStateAction } from 'react'

import { PRIME_ROUTES } from '~constants/index'
import LinkExtended from '~components/LinkExtended'
import { useLocalization } from '~contexts/localizationContext'

import { SubMenuContentType } from '..'

import styles from './RootMenu.module.css'

type obj = { [key: string]: string }

type Props = {
  setShowMenu: Dispatch<boolean>
  setSubMenu: Dispatch<SetStateAction<SubMenuContentType>>
  activeMenuItem?: string | null
  setActiveMenuItem: Dispatch<SetStateAction<string | null>>
  clearActiveMenuItem: () => void
  setRootMenuOpen: Dispatch<SetStateAction<boolean>>
  navigationTranslations: obj
}

const RootMenu = ({
  setShowMenu,
  setSubMenu,
  activeMenuItem = null,
  clearActiveMenuItem,
  setActiveMenuItem,
  setRootMenuOpen,
  navigationTranslations
}: Props) => {
  const [{ locale }] = useLocalization()

  return (
    <ul className={styles.list}>
      {Object.entries(PRIME_ROUTES).map(
        ([path, { name, sub, inactive, thumbnail }]) => (
          <li
            className={
              inactive
                ? styles.listItemInactive
                : activeMenuItem === name
                  ? styles.listItemActive
                  : styles.listItem
            }
            key={path}
            onMouseEnter={() => {
              if (sub) {
                setShowMenu(true)
                setSubMenu({
                  content: sub,
                  basePath: `/${locale}${path}`,
                  mainThumbnail: thumbnail
                })
              }
              setActiveMenuItem(name)
            }}
            onMouseLeave={(e) => {
              if (
                (e?.relatedTarget as HTMLLIElement)?.getAttribute?.(
                  'data-submenupersist'
                ) === '1'
              )
                return
              setShowMenu(false)
              clearActiveMenuItem()
            }}
            data-submenupersist={sub ? 1 : 0}
          >
            <LinkExtended
              to={`/${locale}${path}`}
              className={inactive ? '' : styles.link}
              activeClassName={styles.activeLink}
              inactive={inactive}
              data-submenupersist={sub ? 1 : 0}
              // FIXME - onFocus is not working
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onFocus={() => setRootMenuOpen(true)}
              onClick={() => setShowMenu(false)}
            >
              {navigationTranslations[path]}
            </LinkExtended>
          </li>
        )
      )}
    </ul>
  )
}

export default memo(RootMenu)
