import React, {memo, useCallback, useEffect, useRef} from 'react'
import {bool, func, number, object} from 'prop-types'
import {useSpring, animated, config} from 'react-spring'

import {LanguageIcon} from 'assets/images'
import DarkThemeSwitcher from 'components/DarkThemeSwitcher'
import styles from './Options.module.css'

const propTypes = {
  isOpen: bool,
  menuHeight: number,
  setOptionsOpen: func,
  isFixed: bool,
  isScrollDown: bool,
  headerTop: object.isRequired
}

const defaultProps = {
  isOpen: false,
  menuHeight: 0,
  setOptionsOpen: () => {},
  isFixed: false,
  isScrollDown: false
}

const useClickOutside = (ref, cb) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if(ref.current && !ref.current.contains(event.target)) {cb()}
    }
    document.addEventListener('click', handleClickOutside, false)
    return () => document.removeEventListener('click', handleClickOutside, false)
  }, [ref, cb])
}

const useScroll = cb => {
  useEffect(() => {
    const scrollHandler = () => cb()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [cb])
}

const Options = ({isOpen, menuHeight, setOptionsOpen, isFixed, isScrollDown, headerTop}) => {
  const optionsRef = useRef(null)

  const persistPosition = useRef(null)
  const position = isFixed ? 'fixed' : 'absolute'

  const {transform} = useSpring({
    config: config.slow,
    transform: isOpen
      ? 'translate3d(0, 0, 0) scale(1)'
      : 'translate3d(3px, -5px, 0) scale(0.98)',
    onStart: () => persistPosition.current = position,
    onRest: () => persistPosition.current = null
  })

  const {opacity} = useSpring({
    config: config.stiff,
    opacity: isOpen ? 1 : 0
  })

  const closingCallback = useCallback(() => {
    isOpen && setOptionsOpen(false)
  }, [isOpen, setOptionsOpen])

  useClickOutside(optionsRef, closingCallback)
  useScroll(closingCallback)

  return (
    <animated.div
      style={{
        opacity,
        transform: isScrollDown
          ? isFixed ? headerTop.interpolate(i => `translate3d(0, ${i}px, 0)`) : 'initial'
          : transform,
        top: menuHeight,
        visibility: opacity.interpolate(o => o > 0.3 ? 'visible' : 'hidden'),
        position: persistPosition.current
          ? persistPosition.current
          : position
      }}
      className={styles.optionsContainer}
      ref={optionsRef}
    >
      <button className={styles.langBtn} type="button">
        <LanguageIcon width={22} height={22} fill="#696969" />
        <span className={styles.langTxt}>Сменить язык на русский</span>
      </button>
      <DarkThemeSwitcher name="theme-options" labelText />
    </animated.div>
  )
}

Options.propTypes = propTypes
Options.defaultProps = defaultProps

export default memo(Options)