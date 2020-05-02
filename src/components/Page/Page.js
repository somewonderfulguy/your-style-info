import React, {useEffect} from 'react'
import {array, func, shape, string} from 'prop-types'

// TODO componentRenderer should be colocated
import {componentRenderer} from 'shared'
import styles from './Page.module.css'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired,
  header: string,
  components: array,
  fetchPageData: func.isRequired
}

const defaultProps = {
  header: '',
  components: []
}

const Page = ({location: {pathname}, header, components, fetchPageData}) => {
  useEffect(() => {
    fetchPageData(pathname)
  }, [fetchPageData, pathname])

  return (
    <article className={styles.page}>
      <h1>{header}</h1>
      {!!components.length && componentRenderer(components)}
    </article>
  )
}

Page.propTypes = propTypes
Page.defaultProps = defaultProps

export default Page