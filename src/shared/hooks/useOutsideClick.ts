import { MutableRefObject, useEffect } from 'react'

import { anyFunctionType } from '..'

export const useOutsideClick = (
  ref: MutableRefObject<Element | null>,
  cb: anyFunctionType,
  ignoreElements: Element[] = []
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !ignoreElements.some((element) =>
          element.contains(event.target as Node)
        )
      ) {
        cb()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [ref, cb, ignoreElements])
}
