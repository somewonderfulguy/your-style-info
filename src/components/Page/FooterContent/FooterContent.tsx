import DarkThemeSwitcher from '~components/DarkThemeSwitcher'
import LangSelector from '~components/LangSelector'
import SocialMediaIcons from '~components/SocialMediaIcons'

import FooterNavigation from './FooterNavigation'

import styles from './FooterContent.module.css'

const FooterContent = () => (
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
)

export default FooterContent
