import React from 'react'

import FooterNavigation from './FooterNavigation'
import DarkThemeSwitcher from 'components/DarkThemeSwitcher'
import LangSelector from 'components/LangSelector'
import SocialMediaIcons from 'components/SocialMediaIcons'
import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.layout}>
      <FooterNavigation />
      <div className={styles.iconsContainer}>
        <div className={styles.langContainer}>
          <LangSelector gray showAbove />
        </div>
        <SocialMediaIcons />
        <div className={styles.themeSwitcherContainer}>
          <DarkThemeSwitcher darkerPalette />
        </div>
      </div>
    </div>
  </footer>
)

export default Footer