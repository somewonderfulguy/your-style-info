import { useSpring } from 'react-spring'

export function useAnimatedAppearing() {
  const appearingSpring = useSpring({
    config: { mass: 1, tension: 120, friction: 60 },
    from: {
      opacity: 0,
      top: -10
    },
    to: {
      opacity: 1,
      top: 0
    }
  })

  return { appearingSpring }
}
