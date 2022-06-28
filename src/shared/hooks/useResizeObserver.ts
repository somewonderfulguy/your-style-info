import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'

import {throttle} from 'shared/utils'

export function useResizeObserver(delay = 0, initialBounds = {left: 0, top: 0, width: 0, height: 0}) {
  const elemRef = useRef<Element>(null)
  const [bounds, setBounds] = useState(initialBounds)

  const observer = throttle(([entry]) => setBounds(Array.isArray(entry) ? entry[0].contentRect : entry.contentRect), delay)
  const [resizeObserver] = useState(() => new ResizeObserver(observer))
  const disconnect = useCallback(() => resizeObserver.disconnect(), [resizeObserver])

  useEffect(() => {
    if(elemRef.current) {
      resizeObserver.observe(elemRef.current)
    }
    return disconnect
  }, [resizeObserver, disconnect])

  return [elemRef, bounds ?? initialBounds] as [MutableRefObject<Element>, typeof initialBounds]
}