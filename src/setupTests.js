import '@testing-library/jest-dom/extend-expect'
import {toMatchDiffSnapshot} from 'snapshot-diff'

expect.extend({toMatchDiffSnapshot})

// remove double slashes
expect.addSnapshotSerializer({
  test(val) {return typeof val === 'string' && val.search(/Snapshot Diff/i) !== -1},
  print(val) {return val.replace(/\\\\/gm, '')}
})

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