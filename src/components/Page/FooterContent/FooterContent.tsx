import DarkThemeSwitcher from '~components/DarkThemeSwitcher'
import LangSelector from '~components/LangSelector'
import SocialMediaIcons from '~components/SocialMediaIcons'
import useResizeObserver from '~shared/hooks/useResizeObserver'

import FooterNavigation from './FooterNavigation'

import styles from './FooterContent.module.css'

const FooterContent = () => {
  const [bindResizeObserver, { width }] = useResizeObserver<HTMLDivElement>()

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
