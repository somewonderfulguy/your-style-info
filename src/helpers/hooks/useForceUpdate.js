import {useCallback, useState} from 'react'

export function useForceUpdate(){
  const [, setValue] = useState(0)
  const forceUpdate = useCallback(() => setValue(value => ++value), [setValue])
  return forceUpdate
}