import React, {useEffect} from 'react'
import {bool} from 'prop-types'
import {useSprings, animated} from 'react-spring'

import {PRIME_ROUTES} from '../../../../constants'
import LinkExtended from '../../../LinkExtended'
import Tree from './Tree'
import {usePrevious} from '../../../../helpers/hooks'
import styles from './MobileMenu.module.css'

const propTypes = {isOpen: bool}
const defaultProps = {isOpen: false}

const renderItem = ([path, {name, sub}], isSubItem = false) => {
  const Link = <LinkExtended to={path} children={name} />
  return sub
    ? <Tree key={path} title={Link} children={Object.entries(sub).map(entry => renderItem(entry, true))} lineClassName={styles.line} />
    : <div key={path} className={isSubItem ? styles.subItemLine : styles.lineLink}>{Link}</div>
}

const MobileMenu = ({isOpen}, ref) => {
  const routesEntries = Object.entries(PRIME_ROUTES)

  // animate one by one appearing
  const prevOpen = usePrevious(isOpen)
  const DURATION = 250
  const DELAY = 150

  const fn = (isOpen, prevOpen) => (index, n) => ({
    config: {duration: DURATION},
    from: {opacity: 0},
    to: {opacity: isOpen || prevOpen ? 1 : 0},
    delay: isOpen ? (index === 0 ? DELAY : DELAY * (index + 1)) : 0
  })

  const [springs, setSprings] = useSprings(routesEntries.length, fn(isOpen, prevOpen))

  useEffect(() => void setSprings({opacity: 0}))
  useEffect(() => void setSprings(fn(isOpen, prevOpen)), [isOpen, setSprings, prevOpen])

  return (
    <div className={styles.menuWrapper}>
      {routesEntries.map((entry, idx) => (
        <animated.div key={entry[0]} style={springs[idx]}>
          {renderItem(entry, false)}
        </animated.div>
      ))}
    </div>
  )
}

MobileMenu.propTypes = propTypes
MobileMenu.defaultProps = defaultProps

export default MobileMenu