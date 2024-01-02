import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { useNProgress } from '@tanem/react-nprogress'
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
  useIsMutating
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Header from '~components/Header'
import ProgressBar from '~components/ProgressBar'
import { useThemeState } from '~contexts/themeContext'
// TODO: colocate ?
import '~services/resizeObserverPolyfill'
// TODO: colocate
import '~assets/styles/common-styles.css'

import Routes from './Routes'
import withContext from './withContext'

import './App.css'
import styles from './App.module.css'

// intentionally making cache never stale, so once fetched - always used cache, like desktop app
export const defaultOptions = {
  queries: {
    initialStale: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  }
}

const queryClient = new QueryClient({ defaultOptions })

const AppComponent = withContext(() => {
  const isDarkTheme = useThemeState()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isLoading = !!isFetching || !!isMutating

  // TODO: do it synchronously
  const className = isDarkTheme
    ? styles.themeWrapperDarkMode
    : styles.themeWrapper
  useEffect(() => {
    document.body.className = className
  }, [className])

  const { progress, isFinished } = useNProgress({ isAnimating: isLoading })
  useEffect(() => {
    document.body.style.cursor = isLoading ? 'progress' : 'initial'
  }, [isLoading])

  // TODO: show loader when page init and language loading for the first time
  // TODO: show error if fetching language fails ( +TODO: make sure all rejected queries are handled )

  return (
    <>
      {!isFinished &&
        createPortal(
          <div className={styles.progressBarContainer}>
            <ProgressBar height="100%" value={Math.trunc(progress * 100)} />
          </div>,
          document.body
        )}
      <Header />
      <Routes />
      <ReactQueryDevtools />
    </>
  )
})

type Props = {
  qClient?: QueryClient
}

const App = ({ qClient = queryClient }: Props) => (
  <QueryClientProvider client={qClient}>
    <Router>
      <AppComponent />
    </Router>
  </QueryClientProvider>
)

export default App
