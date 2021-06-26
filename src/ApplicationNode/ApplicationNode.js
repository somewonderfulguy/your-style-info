import React, {useEffect} from 'react'
import {createPortal} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {useNProgress} from '@tanem/react-nprogress'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import Routes from './Routes'
import Header from 'components/Header'
import ProgressBar from 'components/ProgressBar'
import withContext from './withContext'
import {useLoading, useTheme} from 'contexts'
import 'services/bluebird'
import 'services/resizeObserverPolyfill'

import styles from './ApplicationNode.module.css'
import 'assets/styles/common-styles.css'
import 'assets/styles/fonts.css'

const queryClient = new QueryClient({
  defaultOptions: {
    initialStale: true
  }
})

const ApplicationNode = () => {
  const {isDarkTheme} = useTheme()
  const {isLoading} = useLoading()

  const className = isDarkTheme ? styles.themeWrapperDarkMode : styles.themeWrapper
  useEffect(() => {document.body.className = className}, [className])

  const {progress, isFinished} = useNProgress({isAnimating: isLoading})
  useEffect(() => {
    document.body.style.cursor = isLoading ? 'progress' : 'initial'
  }, [isLoading])

  // TODO: show loader when page init and language loading for the first time
  // TODO: show error if fetching language fails ( +TODO: make sure all rejected queries are handled )

  return (
    <>
      {!isFinished && createPortal(
        <div className={styles.progressBarContainer}>
          <ProgressBar height="100%" value={Math.trunc(progress * 100)} />
        </div>,
        document.body
      )}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Routes />
        </Router>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </>
  )
}

export default withContext(ApplicationNode)