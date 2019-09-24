import React, {PureComponent} from 'react'
import {array, shape, string} from 'prop-types'

import {componentRenderer} from '../../utils'
import styles from './Page.module.css'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired,
  header: string,
  components: array
}

const defaultProps = {
  header: '',
  components: []
}

//TODO double check, do I even need PureComponent
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
      <article className={styles.page}>
        <h1>{this.props.header}</h1>
        {/* TODO the article must be separated by <section> tags - each section should be represented with header */}
        {this.props.components.length && componentRenderer(this.props.components)}
      </article>
    )
  }
}

Page.propTypes = propTypes
Page.defaultProps = defaultProps

export default Page