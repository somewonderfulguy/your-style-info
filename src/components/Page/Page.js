import React, {useCallback, useEffect} from 'react'
import {array, func, shape, string} from 'prop-types'

// TODO componentRenderer should be colocated
import {componentRenderer} from 'shared'
import {useLoading} from 'contexts'
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
  const {setLoading} = useLoading()

  const setLoadingPage = useCallback(isLoading => setLoading({page: isLoading}), [setLoading])

  useEffect(() => {
    setLoadingPage(true)
    fetchPageData(pathname)
      .finally(() => setLoadingPage(false))
  }, [fetchPageData, pathname, setLoadingPage])

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