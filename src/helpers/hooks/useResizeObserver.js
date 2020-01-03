import {useRef, useState, useEffect} from 'react'

import {debounce} from '../../utils/debounce'

export function useResizeObserver(delay = 0) {
  const elemRef = useRef(null)
  const [bounds, setBounds] = useState({left: 0, top: 0, width: 0, height: 0})
  
  const observer = debounce(([entry]) => setBounds(entry.contentRect), delay)
  const [resizeObserver] = useState(() => new ResizeObserver(observer))

  useEffect(() => {
    if(elemRef.current) {
      resizeObserver.observe(elemRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [resizeObserver])

  return [elemRef, bounds]
}