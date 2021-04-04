import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {useSpring, config} from 'react-spring'

import {usePrevious} from 'shared/hooks'
import {useScreenDimensions} from 'contexts'

export const useFooterAnimation = (headerHeight, header, pageContent, isDesktop) => {
  const shadowRenderRef = useRef(null)
  const pageContainerRef = useRef(null)
  const footerRef = useRef(null)

  const [page, setPage] = useState({content: null, header: null})
  const {screenWidth, screenHeight} = useScreenDimensions()

  const [footerSpring, setFooterSpring] = useSpring(() => ({
    from: {
      opacity: 1,
      transform: 'translate3d(0, 0px, 0)'
    },
    config: {
      duration: 600
    }
  }))

  const [pageHeightSpring, setPageHeightSpring] = useSpring(() => ({from: {height: 'auto'}}))

  const previousHeader = usePrevious(header)

  // upd page height on window resize
  useEffect(() => {
    setPageHeightSpring({
      height: shadowRenderRef.current.offsetHeight + (isDesktop ? 0 : headerHeight),
      immediate: true
    })
  }, [screenWidth, setPageHeightSpring, headerHeight, isDesktop])

  // page animation with footer
  useLayoutEffect(() => {
    const triggerPageTransition = () => setPage({content: pageContent, header})

    const upcomingPageHeight = shadowRenderRef.current.offsetHeight
    const currentPageHeight = pageContainerRef.current.offsetHeight

    const setPageHeightImmediate = (height = upcomingPageHeight) =>
      setPageHeightSpring({
        height: isDesktop ? height : height + headerHeight,
        immediate: true
      })

    if(!previousHeader?.length) {
      // page initialisation
      // TODO: footer animation on start
      setTimeout(() => {
        setPageHeightImmediate(shadowRenderRef.current.offsetHeight)
      }, 0)
      return triggerPageTransition()
    }

    // doing animations only when page changed
    if(header === previousHeader) return

    const footerHeight = footerRef.current?.offsetHeight || 0

    const isFooterVisible = headerHeight + currentPageHeight < screenHeight
    const willFooterBeVisible = headerHeight + upcomingPageHeight < screenHeight

    if(isFooterVisible && !willFooterBeVisible) {
      // footer is visible but is going to be out of view
      setFooterSpring({to: {opacity: 0, transform: 'translate3d(0, 15px, 0)'}, immediate: false})
      setTimeout(() => {
        triggerPageTransition()
        setPageHeightImmediate()
      }, 300)
      setTimeout(() => setFooterSpring({to: {opacity: 1, transform: 'translate3d(0, 0px, 0)'}, immediate: true}), 300 + 700)
    } else if(!isFooterVisible && willFooterBeVisible) {
      // footer is not visible but is going to be visible
      setFooterSpring({to: {opacity: 0, transform: 'translate3d(0, 15px, 0)'}, immediate: true})
      triggerPageTransition()
      setPageHeightImmediate()
      setTimeout(() => setFooterSpring({to: {opacity: 1, transform: 'translate3d(0, 0px, 0)'}, immediate: false}), 650)
    } else if(isFooterVisible && willFooterBeVisible) {
      // footer remains visible
      const pageMinHeight = (screenHeight - headerHeight - footerHeight) || 0

      const isFooterRemainsStill = (
        upcomingPageHeight <= pageMinHeight && currentPageHeight <= pageMinHeight
      ) || upcomingPageHeight === currentPageHeight
      const isFooterGoesUp = upcomingPageHeight < currentPageHeight
      const isFooterGoesDown = upcomingPageHeight > currentPageHeight

      const changePageHeight = (height = upcomingPageHeight) => {
        setPageHeightSpring({
          height: isDesktop ? height : height + headerHeight,
          immediate: false,
          config: config.slow
        })
      }

      if(isFooterRemainsStill) {
        // footer position remains the same
        setPageHeightImmediate()
        triggerPageTransition()
      } else if(isFooterGoesDown) {
        // footer remains visible but will be positioned lower
        changePageHeight()
        setTimeout(triggerPageTransition, 300)
      } else if(isFooterGoesUp) {
        const animateHeightTo = upcomingPageHeight < pageMinHeight
          ? pageMinHeight
          : upcomingPageHeight
        // footer remains visible but will be positioned higher
        triggerPageTransition()
        setTimeout(() => changePageHeight(animateHeightTo), 600)
      }
    } else {
      // footer is out of view and will be out of view (or any unhandled case)
      setPageHeightImmediate()
      triggerPageTransition()
    }
  }, [header, previousHeader, headerHeight, pageContent, screenHeight, setFooterSpring, setPageHeightSpring, isDesktop])

  return {
    shadowRenderRef,
    pageContainerRef,
    footerRef,
    page,
    footerSpring,
    pageHeightSpring
  }
}