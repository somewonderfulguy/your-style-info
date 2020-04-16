import {useEffect, useReducer} from 'react'

const HIDE = 'hide'
const SHOW = 'show'
const SCROLL_UP = 'scroll_up'
const SCROLL_DOWN = 'scroll_down'
const UNSET = 'unset'

const navBarInitialState = {
  isFixed: false,
  isShown: false,
  isScrollDown: false
}

const navBarReducer = (state, action) => {
  switch(action.type) {
    case HIDE: return {...state, isFixed: true, isShown: false}
    case SHOW: return {...state, isFixed: true, isShown: true}
    case SCROLL_UP: return {...state, isScrollDown: false}
    case SCROLL_DOWN: return {...state, isScrollDown: true}
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

      if(isScrollUp) dispatchNavBar({type: SCROLL_UP})
      if(isScrollDown) dispatchNavBar({type: SCROLL_DOWN})

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