import React, {PureComponent} from 'react'
import {shape, string} from 'prop-types'

import {componentRenderer} from '../../utils'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired
  // TODO: add header, components
}

class Page extends PureComponent {
  componentDidMount() {
    this.props.fetchPageData(this.props.location.pathname)
  }

  componentDidUpdate(prevProps) {
    if(this.props.location !== prevProps.location) {
      this.props.fetchPageData(this.props.location.pathname)
    }
  }

  render() {
    return (
      <>
        <h1>{this.props.header}</h1>
        {this.props.components.length && componentRenderer(this.props.components)}
      </>
    )
  }
}

Page.propTypes = propTypes

export default Page