import { ComponentClass, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Router as _Router,
  BrowserRouter as _BrowserRouter,
  type RouterProps,
  type BrowserRouterProps
} from 'react-router-dom'
import { useNProgress } from '@tanem/react-nprogress'
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
  useIsMutating
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

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

// TODO: migrate to latest version of react-router and remove this hack
const Router = _Router as unknown as ComponentClass<RouterProps>
const BrowserRouter =
  _BrowserRouter as unknown as ComponentClass<BrowserRouterProps>

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

const ApplicationNodeComponent = () => {
  const isDarkTheme = useThemeState()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isLoading = !!isFetching || !!isMutating

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
      <ReactQueryDevtools position="bottom-right" />
    </>
  )
}

// eslint-disable-next-line react/prop-types
const ApplicationNode = ({ qClient = queryClient, history, ...props }) => (
  <QueryClientProvider client={qClient}>
    {history ? (
      <Router history={history}>
        <ApplicationNodeComponent {...props} />
      </Router>
    ) : (
      <BrowserRouter>
        <ApplicationNodeComponent {...props} />
      </BrowserRouter>
    )}
  </QueryClientProvider>
)

export default withContext(ApplicationNode)
