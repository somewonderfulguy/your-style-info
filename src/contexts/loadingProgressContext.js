// FIXME not in use, due to inability to track progress in xhr request

// import React, {createContext, useCallback, useContext, useMemo, useState} from 'react'

// export const ERROR_LOADING = 'useLoading must be used within a LoadingProvider'

// const LoadingContext = createContext()

// const useLoading = () => {
//   const context = useContext(LoadingContext)
//   if(!context) {
//     throw new Error(ERROR_LOADING)
//   }
//   const [loading, setLoading] = context

//   const allPercentages = Object.values(loading)

//   // get average value
//   const loadingPercentage = allPercentages.reduce((accumulator, currentValue) => (
//     currentValue ? currentValue + accumulator : accumulator
//   ), 0) / allPercentages.length

//   const setLoadingValue = useCallback(
//     (value = {}) => setLoading({...loading, ...value}),
//     [loading, setLoading]
//   )

//   return {loadingPercentage, setLoadingValue}
// }

// const LoadingProvider = props => {
//   // predefine what might influence on global progress bar
//   const [loading, setLoading] = useState({
//     Page: null,
//     Language: null
//   })
//   const value = useMemo(() => [loading, setLoading], [loading])
//   return <LoadingContext.Provider value={value} {...props} />
// }

// export {LoadingProvider, useLoading}