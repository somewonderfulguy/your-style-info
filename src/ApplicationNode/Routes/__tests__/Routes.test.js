import React from 'react'
import mockRouteData from 'react-router-dom'

import Routes from '..'
import {renderWithRouter} from 'shared'

// TODO remove once redux removed
jest.mock('components/PageContainer', () => () => 'page-container')
afterEach(() => jest.clearAllMocks())

const mockLocationDefault = {
  url: '/',
  params: {locale: null}
}

const mockLocationWrong = {
  url: '/elven/menswear-in-rivendell',
  params: {locale: 'elven'}
}

const mockLocationCorrect = {
  url: '/en/outerwear/trench-coat',
  params: {locale: 'en'}
}

test('should redirect from "/" to "/en"', async () => {
  const spyUseRouteMatch = jest.spyOn(mockRouteData, 'useRouteMatch')
  spyUseRouteMatch.mockReturnValueOnce(mockLocationDefault)

  const {history} = renderWithRouter(<Routes />)

  const expectedRedirectedPath = '/en' // configured in setupTests.js
  const actualPath = history.location.pathname

  expect(actualPath).toEqual(expectedRedirectedPath)
  expect(spyUseRouteMatch).toHaveBeenCalledTimes(1)
})

test('should redirect from "/elven" (wrong locale) to "/en" (correct locale)', async () => {
  const spyUseRouteMatch = jest.spyOn(mockRouteData, 'useRouteMatch')
  spyUseRouteMatch.mockReturnValueOnce(mockLocationWrong)

  const {history} = renderWithRouter(<Routes />, {route: mockLocationWrong.url})

  const expectedRedirectedPath = '/en' // configured in setupTests.js
  const actualPath = history.location.pathname

  expect(actualPath).toEqual(expectedRedirectedPath)
  expect(spyUseRouteMatch).toHaveBeenCalledTimes(1)
})

test('should not redirect if locale is correct (such as "ru" or "en")', async () => {
  const spyUseRouteMatch = jest.spyOn(mockRouteData, 'useRouteMatch')
  spyUseRouteMatch.mockReturnValueOnce(mockLocationCorrect)

  const expectedPath = mockLocationCorrect.url

  const {history} = renderWithRouter(<Routes />, {route: expectedPath})

  const actualPath = history.location.pathname

  expect(actualPath).toEqual(expectedPath)
  expect(spyUseRouteMatch).toHaveBeenCalledTimes(1)
})