import React, {createContext} from 'react'
import {arrayOf, node, oneOfType} from 'prop-types'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import PageContainer from 'containers/PageContainer'
import Header from 'components/Header'
import Footer from 'components/Footer'
import store from 'services/store'
import {useWindowResize} from 'helpers/hooks'
import {ThemeProvider, useTheme} from 'helpers/contexts'
import 'services/i18n'
import 'services/bluebird'
import 'services/resizeObserverPolyfill'

import styles from 'ApplicationNode.module.css'
import 'assets/styles/common-styles.css'
import 'assets/styles/fonts.css'

export const ScreenWidthContext = createContext()

const ThemeWrapper = ({children}) => {
  const {isDarkTheme} = useTheme()
  return (
    <div className={isDarkTheme ? styles.ThemeWrapperDarkMode : styles.ThemeWrapper} children={children} />
  )
}
ThemeWrapper.propTypes = {children: oneOfType([arrayOf(node), node])}

const ApplicationNode = () => {
  // TODO optimize context code
  const {width} = useWindowResize()

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <ScreenWidthContext.Provider value={width}>
          {/* TODO remove redux */}
          <Provider store={store}>
            <Router>
              <Header />
              <main>
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
        </ScreenWidthContext.Provider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

export default ApplicationNode