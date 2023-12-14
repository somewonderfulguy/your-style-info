import { Dispatch, memo, useRef } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'

import { primeRoutesType, thumbnailType } from '~constants/index'

import SubMenuContent from './SubMenuContent'

import styles from './SubMenu.module.css'

type Props = {
  content: primeRoutesType
  basePath?: string
  isOpen?: boolean
  openNowAndBefore?: boolean
  mainThumbnail?: thumbnailType
  setMenuOpen: Dispatch<boolean>
}

const SubMenu = ({
  content = {},
  basePath = '',
  isOpen = false,
  openNowAndBefore = false,
  mainThumbnail = null,
  setMenuOpen
}: Props) => {
  // old transitions clean up
  const transitionCancelArray = useRef<(() => void)[]>([])
  transitionCancelArray.current.forEach((cancel, idx) => idx >= 1 && cancel())
  transitionCancelArray.current.splice(2)

  // fade out / in submenu content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transitions = useTransition((isOpen ? content : {}) as any, basePath, {
    config: { duration: openNowAndBefore ? 400 : 0 },
    from: { opacity: 0 },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    enter: () => async (next, cancel) => {
      transitionCancelArray.current.unshift(cancel)
      await next({ opacity: 1 })
    },
    leave: { opacity: 0 },
    immediate: !isOpen
  })

  // transform animation when open / close submenu
  const { transform } = useSpring({
    from: { transform: `translate3d(0, -10px, 0)` },
    to: { transform: `translate3d(0, ${isOpen ? 0 : -10}px, 0)` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

  return (
    // TODO find another way to persist menu
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/no-unknown-property
    <div className={styles.subMenu} submenupersist="1">
      {transitions.map(
        ({
          item: menuItems,
          props: { opacity: opacityTransition },
          key,
          state
        }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let opacity: any = opacityTransition
          switch (state) {
            case 'enter':
              opacity = opacityTransition?.interpolate({
                range: [0, 0.33, 0.66, 1],
                output: [0, 0, 0, 1]
              })
              break
            case 'leave':
              opacity = 0
              break
            default:
              break
          }

          return (
            <animated.div
              key={key}
              className={
                state === 'leave'
                  ? styles.listContainerLeaving
                  : styles.listContainer
              }
              style={{
                // when menu opens / closes opacity.value sometimes becomes NaN and a warning in
                // console happens - this isNaN check is a simple fix
                opacity:
                  typeof opacity.value !== 'undefined' && isNaN(opacity.value)
                    ? 1
                    : opacity,
                transform
              }}
            >
              <SubMenuContent
                menuItems={menuItems}
                mainThumbnail={mainThumbnail}
                isOpen={isOpen}
                basePath={basePath}
                setMenuOpen={setMenuOpen}
              />
            </animated.div>
          )
        }
      )}
    </div>
  )
}

export default memo(SubMenu)
