import {useCallback, useEffect, useRef, useState} from 'react'

export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elemRef = useRef<Element>(null)
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = ([entry]: IntersectionObserverEntry[]) => setIntersecting(entry.isIntersecting)
  const [intersectionObserver] = useState(() => new IntersectionObserver(observer, options))
  const disconnect = useCallback(() => intersectionObserver.disconnect(), [intersectionObserver])

  useEffect(() => {
    if(elemRef.current) {
      intersectionObserver.observe(elemRef.current)
    }
    return disconnect
  }, [intersectionObserver, disconnect])

  return [elemRef, isIntersecting, disconnect]
}