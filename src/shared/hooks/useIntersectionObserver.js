import {useCallback, useEffect, useRef, useState} from 'react'

export const useIntersectionObserver = (options = {}) => {
  const elemRef = useRef(null)
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = ([entry]) => setIntersecting(entry.isIntersecting)
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