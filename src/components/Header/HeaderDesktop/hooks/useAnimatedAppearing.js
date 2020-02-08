import {useSprings} from 'react-spring'

export function useAnimatedAppearing() {
  const appearingSprings = useSprings(4, [...Array(4)].map((i, n) => ({
    config: {mass: 1, tension: 280, friction: 50},
    from: {
      opacity: 0,
      transform: 'translate3d(-20px, 0, 0)',
      reverseTransform: 'translate3d(5px, 0, 0)'
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      reverseTransform: 'translate3d(0, 0, 0)'
    },
    delay: n === 0 ? 0 : 180 * n
  })))

  return {appearingSprings}
}