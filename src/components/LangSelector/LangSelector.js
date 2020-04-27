import React, {useRef, useState} from 'react'
import {bool} from 'prop-types'

import {useTheme} from 'helpers/contexts'
import {useOutsideClick} from 'helpers/hooks'
import {LanguageIcon} from 'assets/images'
import styles from './LangSelector.module.css'

const propTypes = {
  showAbove: bool,
  gray: bool
}

const defaultProps = {
  showAbove: false,
  gray: false
}

const LangSelector = ({showAbove, gray}) => {
  const {isDarkTheme} = useTheme()
  const langSelectorRef = useRef(null)
  const menuRef = useRef(null)

  const [isOpen, setOpen] = useState(false)

  // TODO !!!! Already have this, improve !!!!
  useOutsideClick(langSelectorRef, () => setOpen(false))

  const langSelectorClass = isDarkTheme ? styles.langSelectorDark : styles.langSelector
  const grayClass = gray ? styles.gray : ''

  const triangleClass = showAbove
    ? (isOpen ? styles.triangle : styles.triangleReverse)
    : (isOpen ? styles.triangleReverse : styles.triangle)

  return (
    <div
      ref={langSelectorRef}
      onClick={() => setOpen(isOpen => !isOpen)}
      className={`${langSelectorClass} ${grayClass}`}
    >
      <button className={styles.langSelectorInner} type="button">
        <LanguageIcon width={20} height={20} className={styles.icon} />
        <span>English</span>
        <div className={triangleClass} />
      </button>

      {isOpen && (
        <ul ref={menuRef} className={showAbove ? styles.dropDownAbove : styles.dropDownBelow}>
          <li><button type="button" disabled>English</button></li>
          <li><button type="button">Русский</button></li>
        </ul>
      )}
    </div>
  )
}

LangSelector.propTypes = propTypes
LangSelector.defaultProps = defaultProps

export default LangSelector