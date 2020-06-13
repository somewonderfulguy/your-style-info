import React, {useLayoutEffect, useRef} from 'react'
import {Redirect, Route, Switch, useHistory, useLocation, useRouteMatch} from 'react-router-dom'

import PageContainer from 'components/PageContainer'
import {LOCALES} from 'constants/index'
import {useLocalisation} from 'contexts'

const Routes = () => {
  const pathLocale = '/:locale'
  const routeMatch = useRouteMatch(pathLocale)
  const history = useHistory()
  const {pathname} = useLocation()

  const {locale} = useLocalisation()

  const urlLocale = routeMatch?.params.locale
  const isLocaleExist = LOCALES.some(locale => locale === urlLocale)

  const prevLocale = useRef(null)
  useLayoutEffect(() => {
    if(!locale || locale === prevLocale.current || !isLocaleExist) return
    prevLocale.current = locale
    history.push(pathname.replace(/^\/\w{2}/, `/${locale}`))
  }, [locale, history, pathname, isLocaleExist])

  // TODO show page with 'wrong locale' and redirect after timeout
  if(!isLocaleExist && locale) {
    return <Redirect to={`/${locale}`} />
  }

  return isLocaleExist ? (
    <Switch>
      <Route path={`${pathLocale}`} component={PageContainer} />
      <Route path={`${pathLocale}/:page`} component={PageContainer} />
    </Switch>
  ) : null
}

export default Routes