import React, {useState} from 'react'

import {LanguageIcon} from '../../assets/images'
import styles from './LangSelector.module.css'

const LangSelector = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <button className={styles.langSelector} onClick={() => setOpen(isOpen => !isOpen)}>
      <LanguageIcon width={20} height={20} fill="#696969" className={styles.icon} />
      <span>English</span>
      <div className={isOpen ? styles.triangleReverse : styles.triangle} />
    </button>
  )
}

export default LangSelector