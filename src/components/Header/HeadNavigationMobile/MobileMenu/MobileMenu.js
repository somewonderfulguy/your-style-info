import React, {forwardRef, useEffect, useImperativeHandle} from 'react'
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

const MobileMenu = forwardRef(({isOpen}, ref) => {
  const routesEntries = Object.entries(PRIME_ROUTES)

  const prevOpen = usePrevious(isOpen)
  const DURATION = 250
  const DELAY = 150

  const springsFunction = (isOpen, prevOpen) => idx => ({
    config: {duration: DURATION},
    from: {opacity: 0},
    to: {opacity: isOpen || prevOpen ? 1 : 0},
    delay: isOpen ? (idx === 0 ? DELAY : DELAY * (idx + 1)) : 0,
    immediate: false
  })

  const [menuItemsSprings, setMenuItemsSprings] = useSprings(routesEntries.length, springsFunction(isOpen, prevOpen))

  useEffect(() => {
    isOpen && setMenuItemsSprings(springsFunction(isOpen, prevOpen))
  }, [isOpen, prevOpen, setMenuItemsSprings])

  useImperativeHandle(ref, () => ({
    resetAnimation: () => setMenuItemsSprings({opacity: 0, delay: 0, immediate: true})
  }))

  return (
    <div className={styles.menuWrapper}>
      {routesEntries.map((entry, idx) => (
        <animated.div key={entry[0]} style={menuItemsSprings[idx]}>
          {renderItem(entry, false)}
        </animated.div>
      ))}
    </div>
  )
})

MobileMenu.propTypes = propTypes
MobileMenu.defaultProps = defaultProps

export default MobileMenu