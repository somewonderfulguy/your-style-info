import { CSSProperties, memo, ReactNode, useState } from 'react'
import { useSpring, animated } from 'react-spring'

import { ArrowForwardIos } from '~assets/images'
import useResizeObserver from '~shared/hooks/useResizeObserver'

import styles from './Tree.module.css'

type Props = {
  children?: ReactNode
  lineClassName?: string
  title?: ReactNode
  style?: CSSProperties
  defaultOpen?: boolean
}

const Tree = ({
  children = null,
  lineClassName = '',
  title = '',
  style = {},
  defaultOpen
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [bindResizeObserver, { height: viewHeight }] =
    useResizeObserver<HTMLUListElement>()

  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px, 0, 0)' },
    to: {
      height: isOpen ? viewHeight + 7 : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px, 0, 0)`
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

  return (
    <div className={styles.frame}>
      <div className={lineClassName}>
        <button
          style={{ opacity: children ? 1 : 0.3 }}
          className={isOpen ? styles.iconOpen : styles.icon}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup
        >
          <ArrowForwardIos />
        </button>

        <span style={style} className={styles.title}>
          {title}
        </span>
      </div>

      <animated.div style={{ opacity, height }} className={styles.content}>
        <animated.ul
          style={{ transform }}
          ref={bindResizeObserver}
          children={children}
        />
      </animated.div>
    </div>
  )
}

export default memo(Tree)
