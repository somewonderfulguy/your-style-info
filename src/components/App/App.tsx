import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Router, BrowserRouter } from 'react-router-dom'
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
import '~assets/styles/fonts.css'

import Routes from './Routes'
import withContext from './withContext'

import styles from './ApplicationNode.module.css'

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
