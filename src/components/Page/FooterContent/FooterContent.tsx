import { MutableRefObject } from 'react'

import DarkThemeSwitcher from '~components/DarkThemeSwitcher'
import LangSelector from '~components/LangSelector'
import SocialMediaIcons from '~components/SocialMediaIcons'
import { useResizeObserver } from '~shared/hooks'

import FooterNavigation from './FooterNavigation'

import styles from './FooterContent.module.css'

const FooterContent = () => {
  const [ref, { width }] = useResizeObserver()
  const bindResizeObserver = ref as MutableRefObject<HTMLDivElement>

  return (
    <div className={styles.layout} ref={bindResizeObserver}>
      <FooterNavigation isSmaller={width <= 510} />
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
