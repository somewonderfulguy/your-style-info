import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import { throttle } from '~shared/utils'

const useResizeObserver = <T extends HTMLElement>(
  delay = 0,
  initialBounds = { left: 0, top: 0, width: 0, height: 0 }
) => {
  const elemRef = useRef<HTMLElement>(null)
  const [bounds, setBounds] = useState(initialBounds)

  const observer = throttle(
    /* istanbul ignore next */ ([entry]) =>
      setBounds(
        Array.isArray(entry) ? entry[0].contentRect : entry.contentRect
      ),
    delay
  )
  const [resizeObserver] = useState(() => new ResizeObserver(observer))
  const disconnect = useCallback(
    () => resizeObserver.disconnect(),
    [resizeObserver]
  )

  useLayoutEffect(() => {
    if (elemRef.current) {
      resizeObserver.observe(elemRef.current)
    }
    return disconnect
  }, [resizeObserver, disconnect])

  return [elemRef, bounds] as [MutableRefObject<T>, typeof initialBounds]
}

export default useResizeObserver
