import React from 'react'

import {render, screen} from 'shared/tests'
import FooterNavigation from '..'

jest.mock('constants/primeRoutes')
jest.mock('components/LinkExtended', () => ({to, children}) => <a href={to}>{children}</a>)

test('should match snapshot', () => {
  const {asFragment} = render(<FooterNavigation />)
  expect(asFragment()).toMatchSnapshot()
})

test('should render menu items as links and inactive items as usual text', () => {
  render(<FooterNavigation />)

  const listItems = screen.getAllByRole('listitem')
  const links = screen.getAllByRole('link')
  const inactiveItems = screen.getByRole('list').querySelectorAll('*[aria-disabled="true"]')

  expect(listItems).toHaveLength(3)
  expect(links).toHaveLength(2)
  expect(inactiveItems).toHaveLength(1)
})