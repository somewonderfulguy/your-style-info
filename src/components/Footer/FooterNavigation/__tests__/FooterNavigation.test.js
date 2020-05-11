import React from 'react'
import {render} from '@testing-library/react'

import FooterNavigation from '..'

jest.mock('constants/primeRoutes')
jest.mock('components/LinkExtended', () => ({to, children}) => <a href={to}>{children}</a>)

test('should match snapshot', () => {
  const {asFragment} = render(<FooterNavigation />)
  expect(asFragment()).toMatchSnapshot()
})

test('should render menu items as links and inactive items as usual text', () => {
  const {getAllByRole, getByRole} = render(<FooterNavigation />)

  const listItems = getAllByRole('listitem')
  const links = getAllByRole('link')
  const inactiveItems = getByRole('list').querySelectorAll('*[aria-disabled="true"]')

  expect(listItems).toHaveLength(3)
  expect(links).toHaveLength(2)
  expect(inactiveItems).toHaveLength(1)
})