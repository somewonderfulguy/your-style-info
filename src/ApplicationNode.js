import React from 'react'
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
import './services/i18n'
import './services/bluebird'
import './services/resizeObserverPolyfill'

import './assets/styles/common-styles.css'
import './assets/styles/fonts.css'
import styles from './ApplicationNode.module.css'

const ApplicationNode = () => (
  <Provider store={store}>
    <Router>
      <div className={styles.rootGrid}>
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
      </div>
    </Router>
  </Provider>
)

export default ApplicationNode