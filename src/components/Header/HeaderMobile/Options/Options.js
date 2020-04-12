import React, {memo} from 'react'
import {bool, number} from 'prop-types'
import {useSpring, animated, config} from 'react-spring'

import {LanguageIcon} from 'assets/images'
import DarkThemeSwitcher from 'components/DarkThemeSwitcher'
import styles from './Options.module.css'

const propTypes = {
  isOpen: bool,
  menuHeight: number
}

const defaultProps = {
  isOpen: false,
  menuHeight: 0
}

const Options = ({isOpen, menuHeight}) => {
  const {transform} = useSpring({
    config: config.slow,
    transform: isOpen
      ? 'translate3d(0, 0, 0) scale(1)'
      : 'translate3d(3px, -5px, 0) scale(0.98)'
  })

  const {opacity} = useSpring({
    config: config.stiff,
    opacity: isOpen ? 1 : 0
  })

  return (
    <animated.div
      style={{
        opacity,
        transform,
        top: menuHeight,
        visibility: opacity.interpolate(o => o > 0.3 ? 'visible' : 'hidden')
      }}
      className={styles.optionsContainer}
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