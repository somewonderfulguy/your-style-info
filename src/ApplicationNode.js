import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Header from './components/Header'
import Page from './Pages/Page'

const ApplicationNode = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Page} />
      <Route exact path="/:page" component={Page} />
      <Route exact path="/:page/:topic" component={Page} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
)

export default ApplicationNode