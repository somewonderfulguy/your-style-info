import { useRef, useState } from 'react'

import { useThemeState } from '~contexts/themeContext'
import { useLocalization } from '~contexts/localizationContext'
import { useOutsideClick } from '~shared/hooks'
import { LanguageIcon } from '~assets/images'
import { LANGUAGES, LOCALES } from '~constants/index'

import styles from './LangSelector.module.css'

type Props = {
  showAbove?: boolean
  gray?: boolean
}

const LangSelector = ({ showAbove = false, gray = false }: Props) => {
  const [
    { locale: currentLocale },
    setLocaleState,
    { isLoading: isLanguageLoading, data: localeData }
  ] = useLocalization()

  const isDarkTheme = useThemeState()
  const langSelectorRef = useRef(null)
  const menuRef = useRef(null)
  const [isOpen, setOpen] = useState(false)

  useOutsideClick(langSelectorRef, () => setOpen(false))

  const langSelectorClass = isDarkTheme
    ? styles.langSelectorDark
    : styles.langSelector
  const grayClass = gray ? styles.gray : ''

  const triangleClass = showAbove
    ? isOpen
      ? styles.triangle
      : styles.triangleReverse
    : isOpen
      ? styles.triangleReverse
      : styles.triangle

  return (
    <div ref={langSelectorRef} className={`${langSelectorClass} ${grayClass}`}>
      <button
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={styles.langSelectorInner}
        type="button"
        disabled={isLanguageLoading}
        aria-label={localeData?.switchLanguage.switchLang ?? 'Switch language'}
        aria-expanded={isOpen}
        aria-haspopup
        data-testid="langSelector"
      >
        <LanguageIcon width={20} height={20} className={styles.icon} />
        <span>{LANGUAGES.get(currentLocale)}</span>
        <div className={triangleClass} />
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          className={showAbove ? styles.dropDownAbove : styles.dropDownBelow}
          role="menu"
        >
          {LOCALES.map((locale) => (
            <li role="menuitem" key={locale}>
              <button
                type="button"
                disabled={locale === currentLocale}
                onClick={() => {
                  setLocaleState(locale as 'en' | 'ua')
                  setOpen(false)
                }}
              >
                {LANGUAGES.get(locale)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LangSelector
