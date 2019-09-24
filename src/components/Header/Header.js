import React from 'react'
import {useTranslation} from 'react-i18next';

import HeadNavigation from './HeadNavigation'
import LangSelector from './LangSelector'
import styles from './Header.module.css'

const Header = () => {
  const {t} = useTranslation('', { useSuspense: false })

  return (
    <header className={styles.header}>
      <div className={styles.hgroup}>
        <h1 className={styles.title}>Your Style</h1>
        <span className={styles.subtitle}>{t('subtitle')}</span>
      </div>

      <HeadNavigation />

      <div className={styles.langContainer}>
        <LangSelector />
      </div>
    </header>
  )
}

export default Header