import {useEffect, useReducer} from 'react'

const HIDE = 'hide'
const SHOW = 'show'
const UNSET = 'unset'

const navBarInitialState = {
  isFixed: false,
  isShown: false
}

const navBarReducer = (state, action) => {
  switch(action.type) {
    case HIDE: return {isFixed: true, isShown: false}
    case SHOW: return {isFixed: true, isShown: true}
    case UNSET: return navBarInitialState
    default: return state
  }
}

export function useStickyNavBar(bottomBoundary = 0, topBoundary = 0) {
  const [navBarState, dispatchNavBar] = useReducer(navBarReducer, navBarInitialState)

  useEffect(() => {
    let prevScrollPosition = 0

    const scrollHandler = () => {
      const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop

      const isScrollUp = prevScrollPosition > scrollPosition
      const isScrollDown = !isScrollUp
      const isBelowNavbar = scrollPosition > bottomBoundary
      const isAboveNavbar = scrollPosition <= topBoundary

      if(isScrollUp && isAboveNavbar) dispatchNavBar({type: UNSET})
      if(isScrollUp && isBelowNavbar) dispatchNavBar({type: SHOW})
      if(isScrollDown && isBelowNavbar) dispatchNavBar({type: HIDE})

      prevScrollPosition = scrollPosition
    }

    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [bottomBoundary, topBoundary])

  return navBarState
}