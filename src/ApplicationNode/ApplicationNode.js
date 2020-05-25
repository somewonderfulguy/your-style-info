import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import Header from 'components/Header'
import PageContainer from 'components/PageContainer'
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
          {/* TODO move routers to separate component */}
          <Switch>
            <Route exact path="/:page" component={PageContainer} />
            <Route exact path="/:page/:topic" component={PageContainer} />
            <Route render={() => <Redirect to="/outerwear/trench-coat" />} />
            {/* TODO <Route component={NotFound} /> */}
          </Switch>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default withContext(ApplicationNode)