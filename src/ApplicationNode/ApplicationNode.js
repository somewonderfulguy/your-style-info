import React, {useEffect, useLayoutEffect} from 'react'
import {createPortal} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {useNProgress} from '@tanem/react-nprogress'

import Routes from './Routes'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ProgressBar from 'components/ProgressBar'
import withContext from './withContext'
import store from 'services/store'
import {useHeaderHeight, useLoading, useLocalisation, useTheme} from 'contexts'
import 'services/bluebird'
import 'services/resizeObserverPolyfill'

import styles from './ApplicationNode.module.css'
import 'assets/styles/common-styles.css'
import 'assets/styles/fonts.css'

const ApplicationNode = () => {
  const {isDarkTheme} = useTheme()
  const {headerHeight} = useHeaderHeight()
  const {isLoading} = useLoading()
  const {locale, translations, setLocale} = useLocalisation()

  useLayoutEffect(() => {
    translations === null && setLocale(locale)
  }, [locale, translations, setLocale])

  const className = isDarkTheme ? styles.themeWrapperDarkMode : styles.themeWrapper
  useEffect(() => {document.body.className = className}, [className])

  const {progress, isFinished} = useNProgress({isAnimating: isLoading})
  useEffect(() => {
    document.body.style.cursor = isLoading ? 'progress' : 'initial'
  }, [isLoading])

  // TODO: show loader when page init and language loading for the first time
  // TODO: show error if fetching language fails

  return (
    // TODO remove redux and replace it with React context
    <Provider store={store}>
      {!isFinished && createPortal(
        <div className={styles.progressBarContainer}>
          <ProgressBar height="100%" value={Math.trunc(progress * 100)} />
        </div>,
        document.body
      )}
      <Router>
        <Header />
        <main style={{paddingTop: headerHeight}}>
          <Routes />
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default withContext(ApplicationNode)