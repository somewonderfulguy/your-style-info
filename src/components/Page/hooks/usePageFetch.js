import {useCallback, useEffect, useLayoutEffect, useState, useRef} from 'react'

import {useLoading, useLocalization} from 'contexts'
import {usePrevious} from 'shared/hooks'
import {getPageData} from 'api'

export const usePageFetch = pathname => {
  const {setLoading} = useLoading()
  const [{upcomingLocale}] = useLocalization()

  const [{header, components}, setPageContent] = useState({
    header: '',
    components: []
  })

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
      // TODO setLoading make as dispatch function, so it won't need to add this as dependency
  }, [pathname, setLoading])

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

  return {header, components}
}