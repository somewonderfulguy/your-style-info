import React from 'react'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Header from './components/Header'
import PageContainer from './containers/PageContainer'
import store from './services/store'
import './services/bluebirdConfig'

const ApplicationNode = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={PageContainer} />
        <Route exact path="/:page" component={PageContainer} />
        <Route exact path="/:page/:topic" component={PageContainer} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  </Provider>
)

export default ApplicationNode