import {useContext} from 'react'
import {useSpring, useSprings} from 'react-spring'

import {ScreenWidthContext} from '../../../ApplicationNode'

export function useAnimatedAppearing() {
  const isDesktop = useContext(ScreenWidthContext) > 1024

  // desktop header elements appearing (title, subtitle, menu)
  const desktopSprings = useSprings(3, [...Array(3)].map((i, n) => ({
    config: {mass: 1, tension: 280, friction: 50},
    from: {
      opacity: isDesktop ? 0 : 1,
      transform: `translate3d(${isDesktop ? '-20' : '0'}px, 0, 0)`
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    },
    delay: n === 0 ? 0 : 180 * n
  })))

  // mobile header appearing
  const mobileSpring = useSpring({
    config: {mass: 1, tension: 120, friction: 60},
    from: {
      opacity: isDesktop ? 1 : 0,
      transform: `translate3d(0, ${isDesktop ? '0' : '-10'}px, 0)`
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    }
  })

  return {desktopSprings, mobileSpring: !isDesktop ? mobileSpring : {}}
}