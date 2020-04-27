import React from 'react'

import FooterNavigation from './FooterNavigation'
import DarkThemeSwitcher from '../DarkThemeSwitcher'
import LangSelector from '../LangSelector'
import SocialMediaIcons from '../SocialMediaIcons'
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