import React from 'react'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import PageContainer from './containers/PageContainer'
import store from './services/store'
import './services/bluebirdConfig'
import styles from './ApplicationNode.module.css'

const ApplicationNode = () => (
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
)

export default ApplicationNode