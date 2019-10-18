import React from 'react'
import {animated, useSprings} from 'react-spring'
import {useTranslation} from 'react-i18next'

import HeadNavigation from './HeadNavigation'
import LangSelector from './LangSelector'
import styles from './Header.module.css'
import { Array } from 'core-js'

const Header = () => {
  const {t} = useTranslation('', {useSuspense: false})

  const springs = useSprings(3, [...Array(3)].map((i, n) => ({
    config: {mass: 1, tension: 280, friction: 50},
    from: {
      opacity: 0,
      transform: 'translate3d(-20px, 0, 0)'
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    },
    delay: n === 0 ? 0 : 180 * n
  })))

  return (
    <header className={styles.header}>
      <div className={styles.hgroup}>
        <animated.h1 className={styles.title} style={springs[0]}>
          Your Style
        </animated.h1>
        {/* TODO use HTML text block instead of div */}
        <animated.div className={styles.subtitle} style={springs[1]}>
          {t('subtitle')}
        </animated.div>
      </div>

      <animated.nav style={{opacity: springs[2].opacity}}>
        <HeadNavigation />
      </animated.nav>

      <div className={styles.langContainer}>
        <LangSelector />
      </div>
    </header>
  )
}

export default Header