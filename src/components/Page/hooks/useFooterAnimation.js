/* eslint-disable no-unused-vars */
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {useSpring} from 'react-spring'

import {usePrevious, useResizeObserver} from 'shared/hooks'
import {useScreenDimensions} from 'contexts'

export const useFooterAnimation = (headerHeight, header, pageContent) => {
  const shadowRenderRef = useRef(null)
  const pageContainerRef = useRef(null)
  const footerRef = useRef(null)

  const [page, setPage] = useState({content: null, header: null})
  const {screenHeight} = useScreenDimensions()

  const [footerSpring, set] = useSpring(() => ({
    from: {
      opacity: 1,
      transform: 'translate3d(0, 0px, 0)'
    },
    config: {
      duration: 600
    }
  }))

  const previousHeader = usePrevious(header)

  useLayoutEffect(() => {
    if(!previousHeader?.length) {
      // page initialisation
      return setPage({content: pageContent, header})
    }

    // doing animations only when page changed
    if(header === previousHeader) return

    const upcomingPageHeight = shadowRenderRef.current.offsetHeight
    const currentPageHeight = pageContainerRef.current.offsetHeight
    const footerHeight = footerRef.current?.offsetHeight || 0

    const pageMinHeight = (screenHeight - headerHeight - footerHeight - 20) || 0

    const isFooterVisible = headerHeight + currentPageHeight < screenHeight
    const willFooterBeVisible = headerHeight + upcomingPageHeight < screenHeight

    if(isFooterVisible && !willFooterBeVisible) {
      // footer is visible but is going to be out of view
      set({to: {opacity: 0, transform: 'translate3d(0, 15px, 0)'}, immediate: false})
      setTimeout(() => setPage({content: pageContent, header}), 300)
      setTimeout(() => set({to: {opacity: 1, transform: 'translate3d(0, 0px, 0)'}, immediate: true}), 300 + 700)
    } else if(!isFooterVisible && willFooterBeVisible) {
      // footer is ont visible but is going to be visible
      set({to: {opacity: 0, transform: 'translate3d(0, 15px, 0)'}, immediate: true})
      setPage({content: pageContent, header})
      setTimeout(() => set({to: {opacity: 1, transform: 'translate3d(0, 0px, 0)'}, immediate: false}), 700)

      // footer remains visible but will be positioned lower
      // footer remains visible but will be positioned higher
      // footer position remains the same
      // footer is out of view and will be out of view
    } else {
      setPage({content: pageContent, header}) // run page transition
    }
  }, [header, previousHeader, headerHeight, pageContent, screenHeight, set])

  return {
    shadowRenderRef,
    pageContainerRef,
    footerRef,
    page,
    footerSpring
  }
}