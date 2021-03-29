import {useEffect, useRef} from 'react'
import {useSpring} from 'react-spring'

import {usePrevious, useResizeObserver} from 'shared/hooks'
import {useScreenDimensions} from 'contexts'

export const useFooterAnimation = headerHeight => {
  const [bindResizeObserver, {height: viewHeight}] = useResizeObserver()
  const footerRef = useRef()

  const {screenHeight} = useScreenDimensions()
  const footerHeight = footerRef.current && (footerRef.current.offsetHeight || 0)
  const pageMinHeight = (screenHeight - headerHeight - footerHeight - 20) || 0

  const isFooterVisible = headerHeight + viewHeight < screenHeight
  const wasFooterVisible = usePrevious(isFooterVisible)
  useEffect(() => {
    console.warn(isFooterVisible, wasFooterVisible)
  }, [isFooterVisible, wasFooterVisible])

  const {height: pageHeight} = useSpring({
    immediate: false,
    from: {height: 'auto'},
    to: {
      height: viewHeight < pageMinHeight
        ? pageMinHeight : viewHeight
    }
  })

  return [
    bindResizeObserver, footerRef, {pageHeight}
  ]
}