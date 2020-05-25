import React, {createContext, useContext, useMemo, useState} from 'react'

export const ERROR_HEADER_HEIGHT = 'useHeaderHeight must be used within a HeaderHeightProvider'

const HeaderHeightContext = createContext()

const useHeaderHeight = () => {
  const context = useContext(HeaderHeightContext)
  if(!context) {
    throw new Error(ERROR_HEADER_HEIGHT)
  }
  return context
}

const HeaderHeightProvider = props => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const value = useMemo(() => ({headerHeight, setHeaderHeight}), [headerHeight])
  return <HeaderHeightContext.Provider value={value} {...props} />
}

export {HeaderHeightProvider, useHeaderHeight}