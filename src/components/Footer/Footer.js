import React from 'react'

import FooterNavigation from './FooterNavigation'
import LangSelector from '../LangSelector'
import SocialMediaIcons from '../SocialMediaIcons'
import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.layout}>
      <FooterNavigation />
      <div className={styles.iconsContainer}>
        <div className={styles.langContainer}>
          <LangSelector color="gray" showAbove />
        </div>
        <SocialMediaIcons />
      </div>
    </div>
  </footer>
)

export default Footer