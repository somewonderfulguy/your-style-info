import {useEffect} from 'react'

export const useOutsideClick = (ref, cb) => {
  const handleClickOutside = event => {
    if(ref.current && !ref.current.contains(event.target)) {
      cb && cb()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })
}