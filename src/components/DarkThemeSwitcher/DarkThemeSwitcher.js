import React from 'react'
import {bool} from 'prop-types'

import {useTheme} from 'helpers/contexts'
import moonIcon from 'assets/images/moon.svg'
import sunIcon from 'assets/images/sun.svg'
import styles from './DarkThemeSwitcher.module.css'

const propTypes = {
  darkerPalette: bool
}

const defaultProps = {
  darkerPalette: false
}

const DarkThemeSwitcher = ({darkerPalette}) => {
  const {isDarkTheme, switchTheme} = useTheme()

  return (
    <label className={darkerPalette ? styles.switchDarker : styles.switch}>
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
            backgroundImage: `url('${isDarkTheme ? moonIcon : sunIcon}')`
          }}
        />
      </div>
    </label>
  )
}

DarkThemeSwitcher.propTypes = propTypes
DarkThemeSwitcher.defaultProps = defaultProps

export default DarkThemeSwitcher