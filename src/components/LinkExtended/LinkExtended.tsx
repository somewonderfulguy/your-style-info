import React, {MouseEvent, ReactNode} from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'

import {SCROLL_TOP_DURATION} from 'constants/index'
import {debounce} from 'shared/utils'
import {usePageQuery} from 'api/pageQueries'

// TODO refactor how navigation works - should first wait for content being loaded, then scroll top, then perform animation

type propType = RouteComponentProps & {
  activeClassName?: string
  children?: ReactNode | ReactNode[]
  className?: string
  inactive?: boolean
  to?: string
  // TODO check it out
  onClick?: () => void
  onMouseEnter?: (e: MouseEvent<HTMLSpanElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLSpanElement>) => void
}

const LinkExtended = ({
  history,
  activeClassName = '',
  children = <></>,
  className = '',
  inactive = false,
  location: {pathname},
  to = '/',
  onClick = () => {},
  staticContext, // exclude from ...rest
  ...rest
}: propType) => {
  usePageQuery(to, {enabled: false})

  const debouncedOnScrollEnd = debounce(onScrollEnd, SCROLL_TOP_DURATION)

  function onScrollEnd() {
    history.push(to)
    window.removeEventListener('scroll', debouncedOnScrollEnd)
  }

  // FIXME
  const clickHandler = e => {
    e.preventDefault()

    onClick()

    const isNoScrollNeeded = document.documentElement.scrollTop === 0

    if(isNoScrollNeeded) {
      history.push(to)
    } else {
      scroll.scrollToTop({duration: SCROLL_TOP_DURATION})
      window.addEventListener('scroll', debouncedOnScrollEnd)
    }
  }

  const isCurrent = pathname === to

  if(inactive) return <span className={className} aria-disabled>{children}</span>

  return (
    isCurrent ? (
      <span className={activeClassName} {...rest} onMouseEnter={() => {}}>{children}</span>
    ) : (
      <a href={to} onClick={clickHandler} className={className} {...rest}>
        {children}
      </a>
    )
  )
}

export default withRouter(LinkExtended)