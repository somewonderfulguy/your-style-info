import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { animated, useSpring, useTransition } from 'react-spring'

import { LocaleTranslationsType } from '~api/localeApi'
import {
  PrimeRoutesType,
  ROOT_MENU_THUMBS,
  ThumbnailType
} from '~constants/index'
import { useLocalization } from '~contexts/localizationContext'
import { imgPreload } from '~shared/utils'
import useResizeObserver from '~shared/hooks/useResizeObserver'

import RootMenu from './RootMenu'
import SubMenu from './SubMenu'

import styles from './HeadNavigationDesktop.module.css'

const openMenuInitialState = {
  isOpen: false,
  openNowAndBefore: false
}

const openMenuReducer = (
  state: typeof openMenuInitialState,
  action: boolean
) => ({
  isOpen: action,
  openNowAndBefore: state.isOpen && action
})

export type SubMenuContentType = {
  content: PrimeRoutesType
  basePath: string
  mainThumbnail: ThumbnailType
}

type Props = {
  setRootMenuOpen: Dispatch<SetStateAction<boolean>>
  setPersistRootMenu: Dispatch<SetStateAction<boolean>>
}

const HeadNavigationDesktop = ({
  setRootMenuOpen,
  setPersistRootMenu
}: Props) => {
  const [translations, setTranslations] = useState<LocaleTranslationsType>()
  const [, , { data }] = useLocalization()
  const [openMenuState, setMenuOpen] = useReducer(
    openMenuReducer,
    openMenuInitialState
  )
  // yes, state duplication, needed for sleek animation without jumping (& displaying old translations while new are loading)
  useEffect(() => void (data && setTranslations(data)), [data])

  const [subMenuContent, setSubMenuContent] = useState<SubMenuContentType>({
    content: {},
    basePath: '',
    mainThumbnail: null
  })

  useEffect(() => {
    setPersistRootMenu(openMenuState.isOpen)
  }, [setPersistRootMenu, openMenuState.isOpen])

  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const clearActiveMenuItem = useCallback(() => setActiveMenuItem(null), [])

  const closeMenu = (e: MouseEvent) => {
    if (
      (e?.relatedTarget as HTMLLIElement)?.getAttribute?.(
        'data-submenupersist'
      ) === '1'
    )
      return
    setMenuOpen(false)
    clearActiveMenuItem()
  }

  // preload root thumbs
  useEffect(() => void imgPreload(ROOT_MENU_THUMBS), [])

  // drop-down fade-in-out
  const { opacity: subMenuOpacity } = useSpring({
    config: {
      mass: 1,
      tension: 500,
      friction: 26
    },
    from: {
      opacity: 0,
      visibility: 'hidden'
    },
    opacity: openMenuState.isOpen ? 1 : 0
  })

  // drop-down menu height
  const prevHeight = useRef(0)
  const [bindResizeObserver, { height: newSubMenuHeight }] =
    useResizeObserver<HTMLDivElement>()
  useLayoutEffect(() => {
    prevHeight.current = newSubMenuHeight
  }, [newSubMenuHeight])
  const { height: subMenuHeight } = useSpring({
    immediate: !openMenuState.openNowAndBefore,
    from: { height: 'auto' },
    to: {
      height: openMenuState.isOpen
        ? newSubMenuHeight
        : prevHeight.current
          ? prevHeight.current
          : 'auto'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

  // root menu language transition
  const rootMenuTransitions = useTransition(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translations?.navigation as any,
    translations?.subtitle as string,
    {
      config: { duration: 700 },
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 }
    }
  )

  return (
    <>
      <div className={styles.rootMenuContainer}>
        {rootMenuTransitions.map(
          ({ item, key, props, state }) =>
            !!item && (
              <animated.div
                className={
                  state === 'leave' ? styles.rootMenuTransitionLeave : ''
                }
                style={props}
                key={key}
              >
                <RootMenu
                  setShowMenu={setMenuOpen}
                  setSubMenu={setSubMenuContent}
                  activeMenuItem={activeMenuItem}
                  setActiveMenuItem={setActiveMenuItem}
                  clearActiveMenuItem={clearActiveMenuItem}
                  setRootMenuOpen={setRootMenuOpen}
                  navigationTranslations={item}
                />
              </animated.div>
            )
        )}
        <div
          className={styles.borderBottom}
          data-submenupersist="1"
          onMouseLeave={(e) => closeMenu(e)}
        />
      </div>

      <animated.div
        style={{
          opacity: subMenuOpacity,
          visibility: subMenuOpacity.interpolate((o) =>
            o ?? 0 > 0.1 ? 'visible' : 'hidden'
          ),
          height: subMenuHeight
        }}
        className={styles.subMenuContainer}
        onMouseLeave={(e) => closeMenu(e)}
        data-testid="drop-down-navigation"
      >
        <div ref={bindResizeObserver} data-submenupersist="1">
          <SubMenu
            isOpen={openMenuState.isOpen}
            openNowAndBefore={openMenuState.openNowAndBefore}
            content={subMenuContent.content}
            basePath={subMenuContent.basePath}
            mainThumbnail={subMenuContent.mainThumbnail}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </animated.div>
    </>
  )
}

export default HeadNavigationDesktop
