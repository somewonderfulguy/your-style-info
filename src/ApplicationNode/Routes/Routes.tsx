import React, { MutableRefObject, useLayoutEffect, useRef } from 'react'
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch
} from 'react-router-dom'

import Page from 'components/Page'
import { LOCALES } from 'constants/index'
import { useLocalization } from 'contexts'

const Routes = () => {
  const pathLocale = '/:locale'
  const routeMatch = useRouteMatch<{ locale: string }>(pathLocale)
  const history = useHistory()
  const { pathname } = useLocation()

  const [{ locale }] = useLocalization()

  const urlLocale = routeMatch?.params.locale
  const isLocaleExist = LOCALES.some((locale) => locale === urlLocale)

  const prevLocale: MutableRefObject<string | null> = useRef<string>(null)
  useLayoutEffect(() => {
    if (!locale || locale === prevLocale.current || !isLocaleExist) return
    prevLocale.current = locale
    history.push(pathname.replace(/^\/\w{2}/, `/${locale}`))
  }, [locale, history, pathname, isLocaleExist])

  // TODO show page with 'wrong locale' and redirect after timeout
  if (!isLocaleExist && locale) {
    return <Redirect to={`/${locale}`} />
  }

  return isLocaleExist ? (
    <Switch>
      <Route path={`${pathLocale}`} component={Page} />
      <Route path={`${pathLocale}/:page`} component={Page} />
    </Switch>
  ) : null
}

export default Routes
