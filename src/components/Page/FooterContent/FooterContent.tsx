import { MutableRefObject } from 'react'

import DarkThemeSwitcher from '~components/DarkThemeSwitcher'
import LangSelector from '~components/LangSelector'
import SocialMediaIcons from '~components/SocialMediaIcons'
import { useResizeObserver } from '~shared/hooks/useResizeObserver'

import FooterNavigation from './FooterNavigation'

import styles from './FooterContent.module.css'

const FooterContent = () => {
  const [bindResObs, { width }] = useResizeObserver()
  const bindResizeObserver = bindResObs as MutableRefObject<HTMLDivElement>

  return (
    <div className={styles.layout} ref={bindResizeObserver}>
      <span>{width}</span>
      <p className={styles.tabletTest}>max-width: 1024px</p>
      <p className={styles.mobileTest}>max-width: 768px</p>
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
}

export default FooterContent
