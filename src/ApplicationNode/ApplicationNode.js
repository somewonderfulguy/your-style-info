import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import Routes from './Routes'
import Header from 'components/Header'
import Footer from 'components/Footer'
import withContext from './withContext'
import store from 'services/store'
import {useHeaderHeight, useTheme} from 'contexts'
import 'services/i18n'
import 'services/bluebird'
import 'services/resizeObserverPolyfill'

import styles from './ApplicationNode.module.css'
import 'assets/styles/common-styles.css'
import 'assets/styles/fonts.css'

const ApplicationNode = () => {
  const {isDarkTheme} = useTheme()
  const {headerHeight} = useHeaderHeight()

  const className = isDarkTheme ? styles.themeWrapperDarkMode : styles.themeWrapper
  useEffect(() => {document.body.className = className}, [className])

  return (
    // TODO remove redux and replace it with React context
    <Provider store={store}>
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