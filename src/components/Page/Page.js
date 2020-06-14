import React, {useCallback, useLayoutEffect, useState} from 'react'
import {shape, string} from 'prop-types'

// TODO componentRenderer should be colocated
import {componentRenderer} from 'shared'
import {getPageData} from 'api'
import {useLoading} from 'contexts'
import styles from './Page.module.css'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired
}

const Page = ({location: {pathname}}) => {
  const {setLoading} = useLoading()
  const setLoadingPage = useCallback(isLoading => setLoading({page: isLoading}), [setLoading])

  const [{header, components}, setPageContent] = useState({
    header: '',
    components: []
  })

  useLayoutEffect(() => {
    setLoadingPage(true)
    getPageData(pathname)
      .then(res => res.json())
      .then(data => setPageContent(data))
      .catch(e => console.error(e))
      .finally(() => setLoadingPage(false))
  }, [pathname, setLoadingPage])

  const pageContent = (
    <article className={styles.page}>
      <h1>{header}</h1>
      {!!components.length && componentRenderer(components)}
    </article>
  )

  return pageContent
}

Page.propTypes = propTypes

export default Page