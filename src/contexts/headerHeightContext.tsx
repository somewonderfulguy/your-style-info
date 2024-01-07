import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

const HeaderHeightStateContext = createContext<number | undefined>(undefined)
HeaderHeightStateContext.displayName = 'HeaderHeightStateContext'

const HeaderHeightDispatchContext = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined)
HeaderHeightDispatchContext.displayName = 'HeaderHeightDispatchContext'

const HeaderHeightProvider = ({ children }: { children: ReactNode }) => {
  const [headerHeight, setHeaderHeight] = useState(0)
  return (
    <HeaderHeightStateContext.Provider value={headerHeight}>
      <HeaderHeightDispatchContext.Provider value={setHeaderHeight}>
        {children}
      </HeaderHeightDispatchContext.Provider>
    </HeaderHeightStateContext.Provider>
  )
}

const useHeaderHeightState = () => {
  const context = useContext(HeaderHeightStateContext)
  if (context === undefined) {
    throw new Error(
      'useHeaderHeightState must be used within a HeaderHeightProvider'
    )
  }
  return context
}

const useHeaderHeightDispatch = () => {
  const context = useContext(HeaderHeightDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useHeaderHeightDispatch must be used within a HeaderHeightProvider'
    )
  }
  return context
}

export { HeaderHeightProvider, useHeaderHeightState, useHeaderHeightDispatch }
