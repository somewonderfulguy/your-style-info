import {useCallback, useEffect, useRef, useState} from 'react'

import {debounce} from 'shared/utils'

export function useResizeObserver(delay = 0) {
  const elemRef = useRef(null)
  const [bounds, setBounds] = useState({left: 0, top: 0, width: 0, height: 0})

  const observer = debounce(([entry]) => setBounds(entry.contentRect), delay)
  const [resizeObserver] = useState(() => new ResizeObserver(observer))
  const disconnect = useCallback(() => resizeObserver.disconnect(), [resizeObserver])

  useEffect(() => {
    if(elemRef.current) {
      resizeObserver.observe(elemRef.current)
    }
    return disconnect
  }, [resizeObserver, disconnect])

  return [elemRef, bounds]
}