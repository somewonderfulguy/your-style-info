import React, { Dispatch, Fragment, memo, useState, useRef } from 'react'
import { animated, useTransition } from 'react-spring'

import LinkExtended from '~components/LinkExtended'
import { usePrevious } from '~shared/hooks'
import { useThemeState } from '~contexts/themeContext'
import { useLocalization } from '~contexts/localizationContext'
import { primeRoutesType, thumbnailType } from '~constants/index'

import styles from './SubMenuContent.module.css'

type Props = {
  menuItems: primeRoutesType
  basePath?: string
  mainThumbnail?: thumbnailType
  isOpen?: boolean
  setMenuOpen: Dispatch<boolean>
}

const SubMenuContent = ({
  menuItems,
  basePath = '',
  mainThumbnail = null,
  isOpen = false,
  setMenuOpen
}: Props) => {
  const isDarkTheme = useThemeState()
  const [, , { data: translations }] = useLocalization()
  const [subItemThumbnail, setSubItemThumbnail] = useState<thumbnailType>(null)
  const prevOpen = usePrevious(isOpen)

  // old transitions clean up
  const transitionCancelArray = useRef<(() => void)[]>([])
  transitionCancelArray.current.forEach((cancel, idx) => idx >= 1 && cancel())
  transitionCancelArray.current.splice(2)

  const transitions = useTransition(
    subItemThumbnail || mainThumbnail,
    (item) => item && item.url,
    {
      config: { duration: isOpen !== prevOpen ? 0 : 200 },
      from: { opacity: 0 },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      enter: () => async (next, cancel) => {
        transitionCancelArray.current.unshift(cancel)
        await next({ opacity: 1 })
      },
      leave: { opacity: 0 }
    }
  )

  return (
    <>
      <ul className={styles[isDarkTheme ? 'listDark' : 'list']}>
        {Object.entries(menuItems).map(
          ([path, { name, thumbnail, inactive }]) => (
            <li key={name} className={styles.listItem}>
              <LinkExtended
                to={basePath + path}
                inactive={inactive}
                className={styles.link}
                activeClassName={styles.activeItem}
                onMouseEnter={() => thumbnail && setSubItemThumbnail(thumbnail)}
                onMouseLeave={() => thumbnail && setSubItemThumbnail(null)}
                onClick={() => setMenuOpen(false)}
              >
                {translations?.navigation[path]}
              </LinkExtended>
            </li>
          )
        )}
      </ul>

      {transitions.map(({ item, key, props: { opacity } }) => (
        <Fragment key={key}>
          <div className={styles.heightFill} />
          <animated.img
            src={item && item.url}
            className={styles.image}
            style={{
              opacity:
                // when menu opens / closes opacity.value sometimes becomes NaN and a warning
                // in console happens - this isNaN check is a simple fix
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                typeof (opacity as any)?.value !== 'undefined' &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                isNaN((opacity as any)?.value)
                  ? 1
                  : opacity,
              background: (item && item.background) || '#7d7d7d4c'
            }}
            alt={(item && item.alt) || ''}
          />
        </Fragment>
      ))}
    </>
  )
}

export default memo(SubMenuContent)
