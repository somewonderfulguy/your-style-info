import React, {useRef, useState} from 'react'

import {useOutsideClick} from '../../helpers/hooks'
import {LanguageIcon} from '../../assets/images'
import styles from './LangSelector.module.css'

const LangSelector = () => {
  const langSelectorRef = useRef(null)
  const [isOpen, setOpen] = useState(false)

  useOutsideClick(langSelectorRef, () => setOpen(false))

  return (
    <div className={styles.langSelector} onClick={() => setOpen(isOpen => !isOpen)} ref={langSelectorRef}>
      <button className={styles.langSelectorInner}>
        <LanguageIcon width={20} height={20} fill="#696969" className={styles.icon} />
        <span>English</span>
        <div className={isOpen ? styles.triangleReverse : styles.triangle} />
      </button>

      {isOpen && (
        <ul className={styles.dropDown}>
          <li><button>Polski</button></li>
          <li><button>Русский</button></li>
          <li><button>Українська</button></li>
        </ul>
      )}
    </div>
  )
}

export default LangSelector