import React, {createContext, useContext, useMemo, useReducer} from 'react'

export const ERROR_LOADING = 'useLoading must be used within a LoadingProvider'

const LoadingContext = createContext()

const useLoading = () => {
  const context = useContext(LoadingContext)
  if(!context) {
    throw new Error(ERROR_LOADING)
  }
  const [loading, setLoading] = context

  const isLoading = Object.values(loading).some(l => l)

  return {isLoading, setLoading}
}

const loadingReducer = (state, action) => ({
  ...state, ...action
})

// predefine what might influence on global progress bar
const initialState = {
  page: false,
  language: false
}

const LoadingProvider = props => {
  const [loading, setLoading] = useReducer(loadingReducer, initialState)

  const value = useMemo(() => [loading, setLoading], [loading])
  return <LoadingContext.Provider value={value} {...props} />
}

export {LoadingProvider, useLoading}