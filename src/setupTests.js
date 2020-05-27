import '@testing-library/jest-dom/extend-expect'
import {toMatchDiffSnapshot} from 'snapshot-diff'
import ResizeObserver from 'resize-observer-polyfill'

// toMatchDiffSnapshot
expect.extend({toMatchDiffSnapshot})

// remove double slashes in toMatchDiffSnapshot
expect.addSnapshotSerializer({
  test(val) {return typeof val === 'string' && val.search(/Snapshot Diff/i) !== -1},
  print(val) {return val.replace(/\\\\/gm, '')}
})

// resizeObserver
window.ResizeObserver = ResizeObserver

// matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    ready: true,
    i18n: {
      changeLanguage: jest.fn()
    }
  })
}))

// react-router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    companyId: 'company-id1',
    teamId: 'team-id1',
  }),
  useRouteMatch: () => ({url: '/company/company-id1/team/team-id1'}),
  useLocation: () => ({
    pathname: '/welcome',
    hash: '',
    search: '',
    state: ''
  })
}))