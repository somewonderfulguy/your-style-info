import React from 'react'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'

import PageContainer from './containers/PageContainer'
import Header from './components/Header'
import Footer from './components/Footer'
import i18next from './services/i18next'
import store from './services/store'
import './services/bluebird'
import styles from './ApplicationNode.module.css'

const ApplicationNode = () => (
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <Router>
        <div className={styles.rootGrid}>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={PageContainer} />
              <Route exact path="/:page" component={PageContainer} />
              <Route exact path="/:page/:topic" component={PageContainer} />
              {/* TODO <Route component={NotFound} /> */}
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  </I18nextProvider>
)

export default ApplicationNode