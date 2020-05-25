import React, {memo, useState} from 'react'
import {arrayOf, bool, node, object, oneOfType, string} from 'prop-types'
import {useSpring, animated} from 'react-spring'

import {ArrowForwardIos} from 'assets/images'
import {usePrevious, useResizeObserver} from 'shared/hooks'
import styles from './Tree.module.css'

const propTypes = {
  children: oneOfType([arrayOf(node), node]),
  lineClassName: string,
  title: oneOfType([node, string]),
  style: object,
  defaultOpen: bool
}

const defaultProps = {
  children: null,
  lineClassName: '',
  title: '',
  style: {},
  defaultOpen: false
}

const Tree = ({children, lineClassName, title, style, defaultOpen}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const prevOpen = usePrevious(isOpen)
  const [bindResizeObserver, {height: viewHeight}] = useResizeObserver()

  const {height, opacity, transform} = useSpring({
    from: {height: 0, opacity: 0, transform: 'translate3d(20px, 0, 0)'},
    to: {height: isOpen ? viewHeight + 7 : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px, 0, 0)`}
  })

  return (
    <div className={styles.frame}>
      <div className={lineClassName}>
        <button
          style={{opacity: children ? 1 : 0.3}}
          className={isOpen ? styles.iconOpen : styles.icon}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup
        >
          <ArrowForwardIos />
        </button>

        <span style={style} className={styles.title}>{title}</span>
      </div>

      <animated.div
        style={{
          opacity,
          height: isOpen && prevOpen === isOpen
            ? 'auto'
            : height
        }}
        className={styles.content}
      >
        <animated.ul style={{transform}} ref={bindResizeObserver} children={children} />
      </animated.div>
    </div>
  )
}

Tree.propTypes = propTypes
Tree.defaultProps = defaultProps

export default memo(Tree)