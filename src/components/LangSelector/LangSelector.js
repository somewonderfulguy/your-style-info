import React, {useRef, useState} from 'react'
import {bool, oneOf} from 'prop-types'

import {useOutsideClick} from '../../helpers/hooks'
import {LanguageIcon} from '../../assets/images'
import styles from './LangSelector.module.css'

const propTypes = {
  showAbove: bool,
  color: oneOf(['gray', 'black'])
}

const defaultProps = {
  showAbove: false,
  color: 'black'
}

const COLORS = new Map([
  ['gray', '#696969'],
  ['black', '#000']
])

// TODO: add gray colour for footer
const LangSelector = ({showAbove, color}) => {
  const langSelectorRef = useRef(null)
  const menuRef = useRef(null)

  const [isOpen, setOpen] = useState(false)

  useOutsideClick(langSelectorRef, () => setOpen(false))

  const triangleClass = showAbove
    ? (isOpen ? styles.triangle : styles.triangleReverse)
    : (isOpen ? styles.triangleReverse : styles.triangle)

  return (
    <div ref={langSelectorRef} onClick={() => setOpen(isOpen => !isOpen)} className={styles.langSelector}>
      <button className={styles.langSelectorInner} style={{color: COLORS.get(color)}}>
        <LanguageIcon width={20} height={20} fill="#696969" className={styles.icon} />
        <span>English</span>
        <div className={triangleClass} />
      </button>

      {isOpen && (
        <ul ref={menuRef} className={showAbove ? styles.dropDownAbove : styles.dropDownBelow}>
          <li><button disabled>English</button></li>
          <li><button>Русский</button></li>
        </ul>
      )}
    </div>
  )
}

LangSelector.propTypes = propTypes
LangSelector.defaultProps = defaultProps

export default LangSelector