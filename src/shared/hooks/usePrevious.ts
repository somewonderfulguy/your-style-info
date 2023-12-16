import { useRef, useEffect, MutableRefObject } from 'react'

export const usePrevious = <T>(value: T): T | null => {
  const ref: MutableRefObject<T | null> = useRef(null)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
