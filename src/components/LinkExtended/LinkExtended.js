import React, {Component} from 'react'
import {arrayOf, func, node, oneOfType, shape, string} from 'prop-types'
import {withRouter} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'

//TODO maybe later set duration based on scroll position
import {SCROLL_TOP_DURATION} from '../../constants'
import {debounce} from '../../utils/debounce'

const propTypes = {
  activeClassName: string,
  children: oneOfType([
      arrayOf(node),
      node
  ]),
  className: string,
  history: shape({push: func}).isRequired,
  location: shape({pathname: string}).isRequired,
  to: string,
}

const defaultProps = {
  activeClassName: '',
  children: <></>,
  className: '',
  to: '/'
}

//TODO the scroll event as well as route changing must happen after content loaded - refactor later
class LinkExtended extends Component {
  onScrollEnd = () => {
    this.props.history.push(this.props.to)
    window.removeEventListener('scroll', this.debouncedOnScrollEnd)
  }
  debouncedOnScrollEnd = debounce(this.onScrollEnd, SCROLL_TOP_DURATION)

  onClick = e => {
    e.preventDefault()

    const isNoScrollNeeded = document.documentElement.scrollTop === 0
    
    if(isNoScrollNeeded) {
      this.props.history.push(this.props.to)
    } else {
      scroll.scrollToTop({duration: SCROLL_TOP_DURATION})
      window.addEventListener('scroll', this.debouncedOnScrollEnd)
    }
  }

  render() {
    const {to, activeClassName, className, children, location: {pathname}} = this.props
    const isActive = pathname === to

    return (
      isActive ? (
        <span className={activeClassName}>
          {children}
        </span>
      ) : (
        <a href={to} onClick={this.onClick} className={className}>
          {children}
        </a>
      )
    )
  }
}

LinkExtended.propTypes = propTypes
LinkExtended.defaultProps = defaultProps

export default withRouter(LinkExtended)