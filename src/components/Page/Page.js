import React from 'react'
import {string} from 'prop-types'

const propTypes = {
  name: string
}

const defaultProps = {
  name: ''
}

class Page extends React.Component {
  componentDidMount() {
    //console.log('did mount', this.props)
  }

  componentDidUpdate() {
    //console.log('did update', this.props)
  }

  render() {
    return <div>Page - {this.props.match.url}</div>
  }
}

Page.propTypes = propTypes
Page.defaultProps = defaultProps

export default Page