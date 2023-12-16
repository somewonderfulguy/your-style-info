import { Dispatch, memo, SetStateAction, useEffect, useRef } from 'react'
import { useSpring, animated, config } from 'react-spring'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'

import MobileMenu from './MobileMenu'

import styles from './HeadNavigationMobile.module.css'

type Props = {
  menuHeight: number
  isOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

const HeadNavigationMobile = ({ menuHeight, isOpen, setMenuOpen }: Props) => {
  const subMenuDOM = useRef<HTMLDivElement>(null)
  // used via useImperativeHandle in MobileMenu
  const mobileMenuDOM = useRef<{ resetAnimation: () => void }>()

  // animating menu height
  const { bottom: menuBottom } = useSpring({
    config: isOpen ? config.slow : config.default,
    delay: isOpen ? 150 : 0,
    bottom: isOpen ? '0' : '100%',
    onRest: () => !isOpen && mobileMenuDOM.current?.resetAnimation()
  })

  // animating menu "lining"
  const { opacity: liningOpacity } = useSpring({
    opacity: isOpen ? 1 : 0
  })

  // disable scroll when menu is open
  useEffect(() => {
    if (!subMenuDOM.current) {
      clearAllBodyScrollLocks()
      return
    }

    if (isOpen) {
      disableBodyScroll(subMenuDOM.current)
    } else {
      enableBodyScroll(subMenuDOM.current)
    }
    return () => clearAllBodyScrollLocks()
  }, [isOpen])

  return (
    <animated.nav
      className={styles.lining}
      style={{
        top: menuHeight,
        background: liningOpacity?.interpolate(
          (o) => `rgba(0, 0, 0, ${o ?? 0 / 1.3})`
        ),
        visibility: liningOpacity?.interpolate((o) =>
          !!o && (o as number) > 0 ? 'visible' : 'hidden'
        )
      }}
    >
      <animated.div
        className={styles.mobileMenuContainer}
        style={{
          top: menuHeight,
          bottom: menuBottom,
          borderWidth: menuBottom.interpolate((b) =>
            +(b ? String(b).slice(0, -1) : 0) < 90 ? 1 : 0
          )
        }}
        ref={subMenuDOM}
      >
        <MobileMenu
          isOpen={isOpen}
          ref={mobileMenuDOM}
          setMenuOpen={setMenuOpen}
        />
      </animated.div>
    </animated.nav>
  )
}

export default memo(HeadNavigationMobile)
