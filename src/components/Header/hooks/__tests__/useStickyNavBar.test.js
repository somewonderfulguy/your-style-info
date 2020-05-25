import {fireEvent} from '@testing-library/react'
import {act, renderHook} from '@testing-library/react-hooks'

import {useStickyNavBar} from '..'

// very much implementation details, but for this case, it's okay
// (doing it without implementation details will be perverted)
test('sticky navbar should work as expected', () => {
  const navBarHeight = 49
  const headerHeight = 133
  const {result} = renderHook(() => useStickyNavBar(headerHeight + navBarHeight, headerHeight))

  const defaultState = {isFixed: false, isShown: false, isScrollDown: false}
  const scrolledDownBelowNav = {isFixed: true, isShown: false, isScrollDown: true}
  const scrolledUp = {isFixed: true, isShown: true, isScrollDown: false}

  // check defaults
  expect(result.current).toEqual(defaultState)

  // scroll down but still above header
  act(() => {
    document.body.scrollTop = headerHeight
    fireEvent.scroll(window)
  })
  expect(result.current).toEqual({...defaultState, isScrollDown: true})

  // scrolling below header & navbar should hide navbar
  act(() => {
    document.body.scrollTop = navBarHeight + headerHeight + 1
    fireEvent.scroll(window)
  })
  expect(result.current).toEqual(scrolledDownBelowNav)

  // scroll bit up after scrolling down should show navbar
  act(() => {
    document.body.scrollTop = navBarHeight + headerHeight + 10
    fireEvent.scroll(window)
  })
  act(() => {
    document.body.scrollTop = navBarHeight + headerHeight + 1
    fireEvent.scroll(window)
  })
  expect(result.current).toEqual(scrolledUp)

  // scrolling up above navbar top line should release navbar
  act(() => {
    document.body.scrollTop = navBarHeight
    fireEvent.scroll(window)
  })
  expect(result.current).toEqual(defaultState)
})