import {useCallback, useEffect, useRef, useState} from 'react'
import {useSpring, config} from 'react-spring'

import {usePrevious} from 'shared/hooks'
import {useScreenDimensions} from 'contexts'

export const useFooterAnimation = (headerHeight, header, pageContent, isDesktop) => {
  const shadowRenderRef = useRef(null)
  const pageContainerRef = useRef(null)
  const footerRef = useRef(null)

  const [page, setPage] = useState({content: null, header: null})
  const {screenWidth, screenHeight} = useScreenDimensions()

  const paddingTopCSSVar = '--paddingTop'
  const pagePaddingTop = shadowRenderRef.current &&
    getComputedStyle(shadowRenderRef.current).getPropertyValue(paddingTopCSSVar).replace('px', '')

  if(shadowRenderRef.current !== null && !pagePaddingTop.length) {
    !process.env.NODE_ENV === 'test' && console.warn(`unable to find variable ${paddingTopCSSVar}`)
  }

  const footerHeight = footerRef.current?.offsetHeight || 0
  const pageMinHeight = (screenHeight - headerHeight - footerHeight) - (+pagePaddingTop) || 0

  const [footerSpring, setFS] = useSpring(() => ({
    from: {opacity: 0, transform: 'translate3d(0, 0px, 0)'},
    config: {duration: 600}
  }))
  const setFooterSpring = useCallback(({fadeOut, ...override}) => {
    setFS({
      to: {
        opacity: fadeOut ? 0 : 1,
        transform: `translate3d(0, ${fadeOut ? 15 : 0}px, 0)`
      },
      ...override
    })
  }, [setFS])

  const [pageHeightSpring, setPgHS] = useSpring(() => ({from: {height: 'auto'}}))
  const setPageHeightSpring = useCallback((immediate = true, config = {}) => {
    const upcomingPageHeight = shadowRenderRef.current.offsetHeight

    const animateHeightTo = upcomingPageHeight < pageMinHeight
      ? pageMinHeight
      : upcomingPageHeight

    setPgHS({
      height: animateHeightTo + (isDesktop ? 0 : headerHeight),
      immediate,
      config
    })
  }, [setPgHS, isDesktop, headerHeight, pageMinHeight])

  const previousHeader = usePrevious(header)

  // upd page height on window resize
  useEffect(() => void setPageHeightSpring(), [screenWidth, setPageHeightSpring])

  // page animation with footer
  useEffect(() => {
    const triggerPageTransition = () => setPage({content: pageContent, header})

    if(!previousHeader?.length) {
      // page initialisation
      return setTimeout(() => {
        // TODO use react suspense(?) for faster initialisation - without delays page animation is jumpy
        setPageHeightSpring()
        triggerPageTransition()
        window.scrollTo(0, 0) // TODO try to find real reason of lowered scroll position on mobiles on page init and fix that, instead of doing this hacky fix
        setTimeout(() => setFooterSpring({fadeOut: false}), 600)
      }, 200)
    }

    // doing animations only when page changed
    if(header === previousHeader) return

    const upcomingPageHeight = shadowRenderRef.current.offsetHeight
    const currentPageHeight = pageContainerRef.current.offsetHeight
    const footerHeight = footerRef.current?.offsetHeight || 0

    const isFooterVisible = headerHeight + currentPageHeight < screenHeight
    const willFooterBeVisible = headerHeight + upcomingPageHeight < screenHeight

    if(isFooterVisible && !willFooterBeVisible) {
      // footer is visible but is going to be out of view
      setFooterSpring({fadeOut: true})
      setTimeout(() => {
        triggerPageTransition()
        setPageHeightSpring()
      }, 300)
      setTimeout(() => setFooterSpring({fadeOut: false, immediate: true}), 1000)
    } else if(!isFooterVisible && willFooterBeVisible) {
      // footer is not visible but is going to be visible
      setFooterSpring({fadeOut: true, immediate: true})
      triggerPageTransition()
      setPageHeightSpring()
      setTimeout(() => setFooterSpring({fadeOut: false, immediate: false}), 650)
    } else if(isFooterVisible && willFooterBeVisible) {
      // footer remains visible
      const pageMinHeight = (screenHeight - headerHeight - footerHeight) || 0

      const isFooterRemainsStill = (
        upcomingPageHeight <= pageMinHeight && currentPageHeight <= pageMinHeight
      ) || upcomingPageHeight === currentPageHeight
      const isFooterGoesUp = upcomingPageHeight < currentPageHeight
      const isFooterGoesDown = upcomingPageHeight > currentPageHeight

      const changePageHeight = () => setPageHeightSpring(false, config.slow)

      if(isFooterRemainsStill) {
        // footer position remains the same
        setPageHeightSpring()
        triggerPageTransition()
      } else if(isFooterGoesDown) {
        // footer remains visible but will be positioned lower
        changePageHeight()
        setTimeout(triggerPageTransition, 300)
      } else if(isFooterGoesUp) {
        // footer remains visible but will be positioned higher
        triggerPageTransition()
        setTimeout(() => changePageHeight(), 600)
      }
    } else {
      // footer is out of view and will be out of view (or any unhandled case)
      setPageHeightSpring()
      triggerPageTransition()
    }
  }, [header, previousHeader, headerHeight, pageContent, screenHeight, setFooterSpring, setPageHeightSpring])

  return {
    shadowRenderRef,
    pageContainerRef,
    footerRef,
    page,
    footerSpring,
    pageHeightSpring
  }
}