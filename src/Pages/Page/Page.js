import React, {Component} from 'react'
import {shape, string} from 'prop-types'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired
}

class Page extends Component {
  render() {
    const pathname = this.props.location.pathname

    return <h1>{pathname}</h1>
  }
}

Page.propTypes = propTypes

export default Page