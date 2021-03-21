import {useEffect} from 'react'

export const useOutsideClick = (ref, cb, ignoreElements = []) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if(
        (ref.current && !ref.current.contains(event.target))
        && (!(ignoreElements.some(element => element.contains(event.target))))
      ) {
        cb()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [ref, cb, ignoreElements])
}