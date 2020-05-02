import {useReducer, useEffect} from 'react'

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight
}

const reducer = (state, {width, height}) => ({width, height})

export function useWindowResize() {
  const [dimensions, dispatch] = useReducer(reducer, initialState)

  const listener = () => {
    dispatch({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  return dimensions
}