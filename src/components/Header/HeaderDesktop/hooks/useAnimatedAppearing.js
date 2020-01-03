import {useSprings} from 'react-spring'

export function useAnimatedAppearing() {
  const appearingSprings = useSprings(3, [...Array(3)].map((i, n) => ({
    config: {mass: 1, tension: 280, friction: 50},
    from: {
      opacity: 0,
      transform: `translate3d(-20px, 0, 0)`
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    },
    delay: n === 0 ? 0 : 180 * n
  })))

  return {appearingSprings}
}