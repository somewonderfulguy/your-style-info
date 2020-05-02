import React from 'react'
import {any, arrayOf, bool, func, node, oneOfType, shape, string} from 'prop-types'
import {withRouter} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'

//TODO maybe later set duration based on scroll position
import {SCROLL_TOP_DURATION} from 'constants/index'
import {debounce} from 'shared/utils'

const propTypes = {
  activeClassName: string,
  children: oneOfType([
    arrayOf(node),
    node
  ]),
  className: string,
  history: shape({push: func}).isRequired,
  inactive: bool,
  location: shape({pathname: string}).isRequired,
  to: string,
  staticContext: any
}

const defaultProps = {
  activeClassName: '',
  children: <></>,
  className: '',
  inactive: false,
  to: '/'
}

// TODO the scroll event as well as route changing must happen after content loaded - refactor later
const LinkExtended = ({
  history,
  activeClassName,
  children,
  className,
  inactive,
  location: {pathname},
  to,
  staticContext, // remove it from ...rest
  ...rest
}) => {
  const debouncedOnScrollEnd = debounce(onScrollEnd, SCROLL_TOP_DURATION)

  function onScrollEnd() {
    history.push(to)
    window.removeEventListener('scroll', debouncedOnScrollEnd)
  }

  const onClick = e => {
    e.preventDefault()

    const isNoScrollNeeded = document.documentElement.scrollTop === 0

    if(isNoScrollNeeded) {
      history.push(to)
    } else {
      scroll.scrollToTop({duration: SCROLL_TOP_DURATION})
      window.addEventListener('scroll', debouncedOnScrollEnd)
    }
  }

  const isCurrent = pathname === to

  if(inactive) return <span className={className}>{children}</span>

  return (
    isCurrent ? (
      <span className={activeClassName} {...rest}>{children}</span>
    ) : (
      <a href={to} onClick={onClick} className={className} {...rest}>
        {children}
      </a>
    )
  )
}

LinkExtended.propTypes = propTypes
LinkExtended.defaultProps = defaultProps

export default withRouter(LinkExtended)