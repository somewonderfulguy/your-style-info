import React from 'react'
import {render, screen} from '@testing-library/react'

import FooterNavigation from '..'
import {LocalisationProvider} from 'contexts'

jest.mock('constants/primeRoutes')
jest.mock('components/LinkExtended', () => ({to, children}) => <a href={to}>{children}</a>)

const setup = () => {
  const utils = render(<FooterNavigation />, {wrapper: LocalisationProvider})
  return utils
}

test('should match snapshot', () => {
  const {asFragment} = setup()
  expect(asFragment()).toMatchSnapshot()
})

test('should render menu items as links and inactive items as usual text', () => {
  setup()

  const listItems = screen.getAllByRole('listitem')
  const links = screen.getAllByRole('link')
  const inactiveItems = screen.getByRole('list').querySelectorAll('*[aria-disabled="true"]')

  expect(listItems).toHaveLength(3)
  expect(links).toHaveLength(2)
  expect(inactiveItems).toHaveLength(1)
})