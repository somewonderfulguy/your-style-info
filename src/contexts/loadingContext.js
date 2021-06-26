import React, {createContext, useContext, useMemo, useState} from 'react'

export const ERROR_LOADING = 'useLoading must be used within a LoadingProvider'

const LoadingContext = createContext()
LoadingContext.displayName = 'LoadingContext'

const useLoading = () => {
  const context = useContext(LoadingContext)
  if(!context) {
    throw new Error(ERROR_LOADING)
  }
  const [isLoading, setLoading] = context

  return {isLoading, setLoading}
}

const LoadingProvider = props => {
  const [isLoading, setLoading] = useState(false)

  const value = useMemo(() => [isLoading, setLoading], [isLoading])
  return <LoadingContext.Provider value={value} {...props} />
}

export {LoadingProvider, useLoading}