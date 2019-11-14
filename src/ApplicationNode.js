import React, {createContext} from 'react'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import PageContainer from './containers/PageContainer'
import Header from './components/Header'
import Footer from './components/Footer'
import store from './services/store'
import {useWindowResize} from './helpers/hooks'
import './services/i18n'
import './services/bluebird'
import './services/resizeObserverPolyfill'

import './assets/styles/common-styles.css'
import './assets/styles/fonts.css'

export const ScreenWidthContext = createContext()

const ApplicationNode = () => {
  const {width} = useWindowResize()

  return (
    <ScreenWidthContext.Provider value={width}>
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
  )
}

export default ApplicationNode