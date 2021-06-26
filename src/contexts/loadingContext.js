// TODO revisit logic
import React, {createContext, useContext, useMemo, useState} from 'react'

const LoadingContext = createContext()
LoadingContext.displayName = 'LoadingContext'

const LoadingProvider = props => {
  const [isLoading, setLoading] = useState(false)

  const value = useMemo(() => [isLoading, setLoading], [isLoading])
  return <LoadingContext.Provider value={value} {...props} />
}

const useLoading = () => {
  const context = useContext(LoadingContext)
  if(!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  const [isLoading, setLoading] = context

  return {isLoading, setLoading}
}

export {LoadingProvider, useLoading}