import React, {createContext, useContext, useMemo, useState} from 'react'

const HeaderHeightContext = createContext()
HeaderHeightContext.displayName = 'HeaderHeightContext'

const HeaderHeightProvider = props => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const value = useMemo(() => ({headerHeight, setHeaderHeight}), [headerHeight])
  return <HeaderHeightContext.Provider value={value} {...props} />
}

const useHeaderHeight = () => {
  const context = useContext(HeaderHeightContext)
  if(!context) {
    throw new Error('useHeaderHeight must be used within a HeaderHeightProvider')
  }
  return context
}

export {HeaderHeightProvider, useHeaderHeight}