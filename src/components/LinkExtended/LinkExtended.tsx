import { MouseEvent, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'

import { SCROLL_TOP_DURATION } from '~constants/index'
import { debounce } from '~shared/utils'
import { usePageQuery } from '~api/pageQueries'

// TODO refactor how navigation works - should first wait for content being loaded, then scroll top, then perform animation

type Props = {
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
  activeClassName = '',
  children = <></>,
  className = '',
  inactive = false,
  to = '/',
  onClick = () => {},
  ...rest
}: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  usePageQuery(to, { enabled: false })

  const debouncedOnScrollEnd = debounce(onScrollEnd, SCROLL_TOP_DURATION)

  function onScrollEnd() {
    navigate(to)
    window.removeEventListener('scroll', debouncedOnScrollEnd)
  }

  const isCurrent = pathname.replace(/\/$/, '') === to.replace(/\/$/, '')

  if (inactive)
    return (
      <span className={className} aria-disabled>
        {children}
      </span>
    )

  // TODO: do not put <span /> inside LinkExtended - it is not very straightforward, LinkExtended should be for Link only
  return isCurrent ? (
    <span className={activeClassName} {...rest} onMouseEnter={() => {}}>
      {children}
    </span>
  ) : (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault()
        onClick()

        const isNoScrollNeeded = document.documentElement.scrollTop === 0

        if (isNoScrollNeeded) {
          navigate(to)
        } else {
          scroll.scrollToTop({ duration: SCROLL_TOP_DURATION })
          window.addEventListener('scroll', debouncedOnScrollEnd)
        }
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}

export default LinkExtended
