import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {shape, string} from 'prop-types'
import {animated, useTransition} from 'react-spring'

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

  const [{header, components}, setPageContent] = useState({
    header: '',
    components: []
  })

  const previousPath = String(usePrevious(pathname))
  const removeLangInPath = str => str.replace(/^\/\w{2}/, '')
  const isLocaleChanged = React.useMemo(() => (
    removeLangInPath(previousPath) === removeLangInPath(pathname)

    // previousPath always changes when pathname changes, so it is fine that dependency warning is muted here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [pathname])

  const fetchPage = useCallback((path = pathname) => {
    setLoading(true)
    getPageData(path)
      .then(res => res.json())
      .then(data => {
        setPageContent(data)
        setLoading(false)
        return null
      })
      .catch(e => {
        console.error(e)
        setLoading(false)
      })
  }, [pathname, setLoading])

  const pageContent = (
    <>
      <h1 style={{marginTop: 0}}>{header}</h1>
      {!!components.length && componentRenderer(components)}
    </>
  )

  const pageTransitions = useTransition(pageContent, header, {
    config: {duration: 700},
    from: {
      opacity: 0,
      transform: `translateY(${isLocaleChanged ? 0 : 33}px)`
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {opacity: 0}
  })

  const upcomingPathname = useRef()
  const prevUpcomingLocale = usePrevious(upcomingLocale)

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
      upcomingPathname.current = null
    }
  }, [pathname, upcomingLocale, prevUpcomingLocale, fetchPage])

  return (
    <div className={styles.pageContainer}>
      {pageTransitions.map(({item, key, props, state}) => (
        !!item && (
          <animated.article
            className={state === 'leave' ? styles.pageLeave : styles.page}
            style={props}
            key={key}
          >
            {item}
          </animated.article>
        )
      ))}
    </div>
  )
}

Page.propTypes = propTypes

export default Page