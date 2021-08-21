import React from 'react'

import {useThemeState, useThemeSwitch} from 'contexts'
import moonIcon from 'assets/images/moon.svg'
import sunIcon from 'assets/images/sun.svg'
import styles from './DarkThemeSwitcher.module.css'

type propType = {
  darkerPalette?: boolean;
  labelText?: boolean;
}

const DarkThemeSwitcher = ({darkerPalette = false, labelText = false}: propType) => {
  const isDarkTheme = useThemeState()
  const switchTheme = useThemeSwitch()

  return (
    // TODO: dynamically change aria label text
    <label className={darkerPalette ? styles.switchDarker : styles.switch} aria-label="switch theme">
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isDarkTheme}
        onChange={switchTheme}
      />
      <div className={styles.slider}>
        <div
          className={styles.round}
          style={{
            backgroundImage: `url('${sunIcon}')`,
            opacity: isDarkTheme ? 0 : 1
          }}
        />
        <div
          className={styles.round}
          style={{
            backgroundImage: `url('${moonIcon}')`,
            opacity: isDarkTheme ? 1 : 0,
            zIndex: 1
          }}
        />
      </div>
      {labelText && (
        <span className={styles.text}>Switch theme</span>
      )}
    </label>
  )
}

export default DarkThemeSwitcher