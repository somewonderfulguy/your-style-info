import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {shape, string} from 'prop-types'

// TODO componentRenderer should be colocated
import {componentRenderer} from 'shared'
import {usePrevious} from 'shared/hooks'
import {getPageData} from 'api'
import {useLoading, useLocalisation} from 'contexts'
import styles from './Page.module.css'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired
}

const Page = ({location: {pathname}}) => {
  const {setLoading} = useLoading()
  const {upcomingLocale} = useLocalisation()
  const setLoadingPage = useCallback(isLoading => setLoading({page: isLoading}), [setLoading])

  const [{header, components}, setPageContent] = useState({
    header: '',
    components: []
  })

  const upcomingPathname = useRef()
  const prevUpcomingLocale = usePrevious(upcomingLocale)

  const fetchPage = useCallback((path = pathname) => {
    setLoadingPage(true)
    getPageData(path)
      .then(res => res.json())
      .then(data => {
        setPageContent(data)
        setLoadingPage(false)
        return null
      })
      .catch(e => {
        console.error(e)
        setLoadingPage(false)
      })
  }, [pathname, setLoadingPage])

  // triggers on load / navigation
  useLayoutEffect(() => {
    if(upcomingPathname.current === pathname) return
    fetchPage()
  }, [fetchPage, pathname])

  // triggers on language change
  useEffect(() => {
    if(upcomingLocale !== prevUpcomingLocale && prevUpcomingLocale !== null) {
      upcomingPathname.current = pathname.replace(/\w{2}/, upcomingLocale)
      fetchPage(upcomingPathname.current)
    }
  }, [pathname, upcomingLocale, prevUpcomingLocale, fetchPage])

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