import { memo, useRef } from 'react'
import { useSpring, animated } from 'react-spring'

import { useThemeState } from '~contexts/themeContext'

import styles from './HamburgerIcon.module.css'

type Props = {
  isOpen?: boolean
  onClick?: () => void
}

const HamburgerIcon = ({ isOpen = false, onClick = () => {} }: Props) => {
  const isDarkTheme = useThemeState()
  const hamburgerDOM = useRef<HTMLButtonElement>(null)
  const hamburgerHeight = hamburgerDOM.current?.clientHeight ?? 0
  const lineHeight =
    hamburgerDOM.current?.querySelector('div')?.clientHeight ?? 0
  const middlePosition = hamburgerHeight / 2 - lineHeight / 2
  const lineColor = isDarkTheme ? 'lightgray' : '#000'

  const { timeline } = useSpring({
    config: { duration: 350 },
    timeline: isOpen ? 1 : 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

  const range = [0, 0.4, 0.6, 1]

  const topLine = {
    top: timeline.interpolate(range, [
      0,
      middlePosition,
      middlePosition,
      middlePosition
    ]),
    transform: timeline
      .interpolate({ range, output: [0, 0, 0, 45] })
      .interpolate((x) => `rotate(${x}deg)`)
  }

  const bottomLine = {
    bottom: topLine.top,
    transform: timeline
      .interpolate({ range, output: [0, 0, 0, 45] })
      .interpolate((x) => `rotate(-${x}deg)`)
  }

  const midLine = {
    background: timeline.interpolate({
      range,
      output: [lineColor, 'transparent', 'transparent', 'transparent']
    })
  }

  return (
    <button
      ref={hamburgerDOM}
      onClick={onClick}
      className={styles[isDarkTheme ? 'hamburgerDark' : 'hamburger']}
      type="button"
      title="Navigation"
    >
      <animated.div style={topLine} />
      <animated.div style={midLine} />
      <animated.div style={bottomLine} />
    </button>
  )
}

export default memo(HamburgerIcon)
