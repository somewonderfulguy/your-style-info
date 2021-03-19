import '@testing-library/jest-dom/extend-expect'
import {toMatchDiffSnapshot} from 'snapshot-diff'
import ResizeObserver from 'resize-observer-polyfill'
import matchMediaPolyfill from 'mq-polyfill'
import 'intersection-observer'

// toMatchDiffSnapshot
expect.extend({toMatchDiffSnapshot})

// remove double slashes in toMatchDiffSnapshot
expect.addSnapshotSerializer({
  test(val) {return typeof val === 'string' && val.search(/Snapshot Diff/i) !== -1},
  print(val) {return val.replace(/\\\\/gm, '')}
})

// resizeObserver polyfill
window.ResizeObserver = ResizeObserver

// matchMedia polyfill
matchMediaPolyfill(window)
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height
  }).dispatchEvent(new this.Event('resize'))
}

// react-router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    locale: 'en'
  }),
  useRouteMatch: () => ({
    url: '/en/outerwear/trench-coat',
    params: {locale: 'en'}
  }),
  useLocation: () => ({
    pathname: '/en/outerwear/trench-coat',
    hash: '',
    search: '',
    state: ''
  })
}))

// react-spring: make animations instant
jest.mock('react-spring', () => {
  const actualReactSpring = jest.requireActual('react-spring')
  const barryAllen = {
    config: {duration: 0},
    delay: 0,
    immediate: true
  }
  return {
    ...actualReactSpring,
    useSpring: options => actualReactSpring.useSpring({...options, ...barryAllen}),
    useSprings: (number, setup) => {
      const {useSprings} = actualReactSpring
      return useSprings(number, typeof setup === 'function'
        ? () => ({...setup(), ...barryAllen})
        : setup.map(item => ({...item, ...barryAllen}))
      )
    },
    useTransition: (items, fn, options) => (
      actualReactSpring.useTransition(items, fn, {...options, ...barryAllen})
    )
  }
})