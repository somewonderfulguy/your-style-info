import React, {Dispatch, memo, SetStateAction} from 'react'

import {PRIME_ROUTES} from 'constants/index'
import LinkExtended from 'components/LinkExtended'
import {useLocalization} from 'contexts'
import {subMenuContentType} from '..'
import styles from './RootMenu.module.css'

type obj = {[key: string]: string}

type propsType = {
  setShowMenu: Dispatch<boolean>
  setSubMenu: Dispatch<SetStateAction<subMenuContentType>>
  activeMenuItem?: string | null
  setActiveMenuItem: Dispatch<SetStateAction<string | null>>
  clearActiveMenuItem: () => void
  setRootMenuOpen: Dispatch<SetStateAction<boolean>>
  navigationTranslations: obj
}

const RootMenu = ({
  setShowMenu, setSubMenu, activeMenuItem = null, clearActiveMenuItem, setActiveMenuItem, setRootMenuOpen, navigationTranslations,
}: propsType) => {
  const [{locale}] = useLocalization()

  return (
    <ul className={styles.list}>
      {Object.entries(PRIME_ROUTES).map(([path, {name, sub, inactive, thumbnail}]) => (
        <li
          className={
            inactive
              ? styles.listItemInactive
              : activeMenuItem === name ? styles.listItemActive : styles.listItem
          }
          key={path}
          onMouseEnter={() => {
            if(sub) {
              setShowMenu(true)
              setSubMenu({
                content: sub,
                basePath: `/${locale}${path}`,
                mainThumbnail: thumbnail,
              })
            }
            setActiveMenuItem(name)
          }}
          onMouseLeave={e => {
            if((e?.relatedTarget as HTMLLIElement)?.getAttribute?.('submenupersist') === '1') return
            setShowMenu(false)
            clearActiveMenuItem()
          }}
          // TODO find another way to persist menu
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          submenupersist={sub ? 1 : 0}
        >
          <LinkExtended
            // FIXME that's weeeeird implement in other way
            to={`/${locale}${path}`}
            className={inactive ? '' : styles.link}
            activeClassName={styles.activeLink}
            inactive={inactive}
            // TODO find another way to persist menu
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            submenupersist={sub ? 1 : 0} // TODO consider using refs instead of such attribute (as expample: <Options> & useOutsideClick)
            onFocus={() => setRootMenuOpen(true)}
            onClick={() => setShowMenu(false)}
          >
            {navigationTranslations[path]}
          </LinkExtended>
        </li>
      ))}
    </ul>
  )
}

export default memo(RootMenu)