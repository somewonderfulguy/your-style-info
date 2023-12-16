import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle
} from 'react'
import { useSpring, useSprings, animated } from 'react-spring'

import { PRIME_ROUTES, primeRoutesType } from '~constants/index'
import { useLocalization } from '~contexts/localizationContext'
import LinkExtended from '~components/LinkExtended'
import SocialMediaIcons from '~components/SocialMediaIcons'

import Tree from './Tree'

import styles from './MobileMenu.module.css'

type Props = {
  isOpen?: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

type FirstParam = [
  string,
  { name: string; sub?: primeRoutesType; inactive?: boolean }
]
const renderItem = (
  [path, { name, sub, inactive }]: FirstParam,
  locale: string,
  setMenuOpen: Dispatch<SetStateAction<boolean>>,
  isSubItem: boolean | undefined
) => {
  const Link = (
    <LinkExtended
      to={`/${locale}${path}`}
      children={name}
      inactive={!!inactive}
      className={inactive ? styles.inactiveListItems : ''}
      onClick={() => setMenuOpen(false)}
    />
  )
  return sub ? (
    <Tree
      key={path}
      title={Link}
      children={Object.entries(sub).map((entry, i) => (
        <li className={styles.subItemLine} key={i}>
          {renderItem(entry, locale, setMenuOpen, true)}
        </li>
      ))}
      lineClassName={styles.line}
    />
  ) : (
    <div key={path} className={isSubItem ? '' : styles.lineLink}>
      {Link}
    </div>
  )
}

const MobileMenu = forwardRef(({ isOpen, setMenuOpen }: Props, ref) => {
  const routesEntries = Object.entries(PRIME_ROUTES)
  const [{ locale }] = useLocalization()

  const DURATION = 250
  const DELAY = 150

  const springsFunction = (isOpen) => (idx) =>
    ({
      config: { duration: DURATION },
      from: {
        opacity: 0,
        transform: 'translate3d(16px, 0, 0)'
      },
      to: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      },
      delay: isOpen ? (idx === 0 ? DELAY : DELAY * (idx + 1)) : 0,
      immediate: false
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any

  const [menuItemsSprings, setMenuItemsSprings] = useSprings(
    routesEntries.length,
    springsFunction(isOpen)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any

  const socialMediaAppearing = useSpring({
    config: { duration: 500 },
    from: {
      opacity: 0,
      transform: 'translate3d(0, 10px, 0)'
    },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0)'
    },
    delay: 250
  })

  useEffect(() => {
    isOpen && setMenuItemsSprings(springsFunction(isOpen))
  }, [isOpen, setMenuItemsSprings])

  useImperativeHandle(ref, () => ({
    resetAnimation: () =>
      setMenuItemsSprings({
        opacity: 0,
        transform: 'translate3d(16px, 0, 0)',
        delay: 0,
        immediate: true
      })
  }))

  return (
    <div className={styles.menuWrapper}>
      <ul>
        {routesEntries.map((entry, idx) => (
          <animated.li key={entry[0]} style={menuItemsSprings[idx]}>
            {renderItem(entry, locale, setMenuOpen, false)}
          </animated.li>
        ))}
      </ul>
      <animated.div
        style={socialMediaAppearing}
        className={styles.socialMediaContainer}
      >
        <SocialMediaIcons />
      </animated.div>
    </div>
  )
})
MobileMenu.displayName = 'MobileMenu'

export default MobileMenu
