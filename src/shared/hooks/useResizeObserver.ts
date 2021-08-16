import {useCallback, useEffect, useRef, useState} from 'react'

import {throttle} from 'shared/utils'

export function useResizeObserver(delay = 0) {
  const initalBounds = {left: 0, top: 0, width: 0, height: 0}
  const elemRef = useRef<Element>(null)
  const [bounds, setBounds] = useState(initalBounds)

  const observer = throttle(([entry]) => setBounds(entry.contentRect), delay)
  const [resizeObserver] = useState(() => new ResizeObserver(observer))
  const disconnect = useCallback(() => resizeObserver.disconnect(), [resizeObserver])

  useEffect(() => {
    if(elemRef.current) {
      resizeObserver.observe(elemRef.current)
    }
    return disconnect
  }, [resizeObserver, disconnect])

  return [elemRef, bounds ?? initalBounds]
}