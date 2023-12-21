import { useThemeState, useThemeSwitch } from '~contexts/themeContext'

// TODO: colocate images with component
import moonIcon from '~assets/images/moon.svg'
import sunIcon from '~assets/images/sun.svg'
import styles from './DarkThemeSwitcher.module.css'

type Props = {
  darkerPalette?: boolean
  labelText?: boolean
}

const DarkThemeSwitcher = ({
  darkerPalette = false,
  labelText = false
}: Props) => {
  const isDarkTheme = useThemeState()
  const switchTheme = useThemeSwitch()

  console.log(moonIcon)

  return (
    // TODO: dynamically change aria label text
    <label
      className={darkerPalette ? styles.switchDarker : styles.switch}
      aria-label="switch theme"
    >
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
            backgroundImage: `url("${sunIcon.src}")`,
            opacity: isDarkTheme ? 0 : 1
          }}
        />
        <div
          className={styles.round}
          style={{
            backgroundImage: `url("${moonIcon.src}")`,
            opacity: isDarkTheme ? 1 : 0,
            zIndex: 1
          }}
        />
      </div>
      {labelText && <span className={styles.text}>Switch theme</span>}
    </label>
  )
}

export default DarkThemeSwitcher
