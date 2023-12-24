import { useLayoutEffect, useRef } from 'react'
import {
  useNavigate,
  Route,
  Routes as ReactRouterRoutes
} from 'react-router-dom'

import Page from '~components/Page'
import { useLocalization } from '~contexts/localizationContext'

// TODO: if selected non existing locale or no locale at all - redirect to default locale
// TODO: if wrong page - redirect to 404 (create 404 page)

const Reroute = () => {
  const navigate = useNavigate()
  const [{ locale }] = useLocalization()
  const prevLocale = useRef<string>(null)
  useLayoutEffect(() => {
    if (!locale || locale === prevLocale.current) return
    setTimeout(() => {
      navigate(`/${locale}`, { replace: true })
    }, 0)
  }, [navigate, locale])
  return null
}

const Routes = () => (
  <ReactRouterRoutes>
    <Route path="/:locale/:page/*" element={<Page />} />
    <Route path="/:locale" element={<Page />} />
    <Route path="/*" element={<Reroute />} />
  </ReactRouterRoutes>
)

export default Routes
