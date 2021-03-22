import React from 'react'
import {instanceOf, shape} from 'prop-types'

import FooterNavigation from './FooterNavigation'
import DarkThemeSwitcher from 'components/DarkThemeSwitcher'
import LangSelector from 'components/LangSelector'
import SocialMediaIcons from 'components/SocialMediaIcons'
import styles from './Footer.module.css'

const propTypes = {
  footerRef: shape({current: instanceOf(Element)})
}

const Footer = ({footerRef}) => (
  <footer className={styles.footer} ref={footerRef}>
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

Footer.propTypes = propTypes

export default Footer