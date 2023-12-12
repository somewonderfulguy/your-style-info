import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { useSpring, animated, config } from 'react-spring'

import { LanguageIcon } from 'assets/images'
import DarkThemeSwitcher from 'components/DarkThemeSwitcher'
import { useOutsideClick, anyFunctionType } from 'shared'
import { useLocalization } from 'contexts'
import styles from './Options.module.css'

const useScroll = (cb: anyFunctionType) => {
  useEffect(() => {
    const scrollHandler = () => cb()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [cb])
}

type propsType = {
  isOpen: boolean
  menuHeight?: number
  setOptionsOpen: Dispatch<SetStateAction<boolean>>
  isFixed?: boolean
  isScrollDown: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerTop: any // react-spring
  optionsBtnDOM: Element
}

const Options = ({
  isOpen,
  menuHeight = 0,
  setOptionsOpen,
  isFixed = false,
  isScrollDown = false,
  headerTop,
  optionsBtnDOM
}: propsType) => {
  const optionsRef = useRef(null)
  const [{ locale }, setLanguage, { data }] = useLocalization()
  const switchLanguage = data?.switchLanguage

  const persistPosition = useRef<'fixed' | 'absolute' | null>(null)
  const position = isFixed ? 'fixed' : 'absolute'

  const { transform } = useSpring({
    config: config.slow,
    transform: isOpen
      ? 'translate3d(0, 0, 0) scale(1)'
      : 'translate3d(3px, -5px, 0) scale(0.98)',
    onStart: () => (persistPosition.current = position),
    onRest: () => (persistPosition.current = null)
  })

  const { opacity } = useSpring({
    config: config.stiff,
    opacity: isOpen ? 1 : 0
  })

  const closingCallback = useCallback(() => {
    isOpen && setOptionsOpen(false)
  }, [isOpen, setOptionsOpen])

  const ignoreElements = useMemo(
    () => (optionsBtnDOM ? [optionsBtnDOM] : []),
    [optionsBtnDOM]
  )

  useOutsideClick(optionsRef, closingCallback, ignoreElements)
  useScroll(closingCallback)

  return (
    <animated.div
      style={{
        opacity,
        transform: isScrollDown
          ? isFixed
            ? headerTop.interpolate((i) => `translate3d(0, ${i}px, 0)`)
            : 'initial'
          : transform,
        top: menuHeight,
        visibility: opacity.interpolate((o) =>
          o && o > 0.3 ? 'visible' : 'hidden'
        ),
        position: persistPosition.current ? persistPosition.current : position
      }}
      className={styles.optionsContainer}
      ref={optionsRef}
      role="menu"
    >
      <button
        className={styles.langBtn}
        type="button"
        role="menuitem"
        onClick={() => {
          setOptionsOpen(false)
          setTimeout(() => setLanguage(locale === 'ru' ? 'en' : 'ru'), 100)
        }}
      >
        <LanguageIcon width={22} height={22} fill="#696969" />
        <span className={styles.langTxt}>{switchLanguage?.switchLangTo}</span>
      </button>
      <div role="menuitem">
        <DarkThemeSwitcher labelText />
      </div>
    </animated.div>
  )
}

export default memo(Options)
