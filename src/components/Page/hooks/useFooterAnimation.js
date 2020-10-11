import {useRef} from 'react'
import {useSpring} from 'react-spring'

import {useResizeObserver} from 'shared/hooks'
import {useScreenDimensions} from 'contexts'

export const useFooterAnimation = (headerHeight) => {
  const [bindResizeObserver, {height: viewHeight}] = useResizeObserver()
  const footerRef = useRef()

  const {screenHeight} = useScreenDimensions()
  const footerHeight = footerRef.current && (footerRef.current.offsetHeight || 0)
  const pageMinHeight = (screenHeight - headerHeight - footerHeight - 20) || 0

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