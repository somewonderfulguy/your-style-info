import React from 'react'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import PageContainer from 'components/PageContainer'
import {LOCALES} from 'constants/index'

const Routes = () => {
  const {path} = useRouteMatch('/:locale')
  const {i18n} = useTranslation('', {useSuspense: false})

  const isLocaleExist = LOCALES.some(locale => locale === i18n.language)

  // TODO show page with 'wrong locale' and redirect after timeout
  // FIXME it doesn't work as expected (put here a test!!!)
  if(!isLocaleExist && !!i18n.language) return <Redirect to={`/${i18n.language}`} />

  return (
    <Switch>
      <Route path={`${path}/:page`} component={PageContainer} />
    </Switch>
  )
}

export default Routes