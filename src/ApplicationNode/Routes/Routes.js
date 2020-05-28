import React from 'react'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import PageContainer from 'components/PageContainer'
import {LOCALES} from 'constants/index'

const Routes = () => {
  const pathLocale = '/:locale'
  const routeMatch = useRouteMatch(pathLocale)
  const {i18n} = useTranslation('', {useSuspense: false})

  const urlLocale = routeMatch?.params.locale
  const isLocaleExist = LOCALES.some(locale => locale === urlLocale)

  // TODO show page with 'wrong locale' and redirect after timeout
  if(!isLocaleExist && !!i18n.language) {
    return <Redirect to={`/${i18n.language}`} />
  }

  return isLocaleExist ? (
    <Switch>
      <Route path={`${pathLocale}/:page`} component={PageContainer} />
    </Switch>
  ) : null
}

export default Routes