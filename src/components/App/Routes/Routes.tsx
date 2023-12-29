import {
  useNavigate,
  Route,
  Routes as ReactRouterRoutes
} from 'react-router-dom'

import Page from '~components/Page'
import { useLocalization } from '~contexts/localizationContext'

// TODO: if selected non existing locale or no locale at all - redirect to default locale
// TODO: if wrong page - redirect to 404 (create 404 page)

const EmptyPathReroute = () => {
  const navigate = useNavigate()
  const [{ locale }] = useLocalization()
  navigate(`/${locale}`, { replace: true })
  return null
}

const Routes = () => (
  <ReactRouterRoutes>
    <Route path="/:locale/:page/*" element={<Page />} />
    <Route path="/:locale" element={<Page />} />
    <Route path="/*" element={<EmptyPathReroute />} />
  </ReactRouterRoutes>
)

export default Routes
