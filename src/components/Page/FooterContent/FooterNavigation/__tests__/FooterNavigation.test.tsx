import React, {ReactNode} from 'react'

import {render, screen} from 'shared/tests'
import FooterNavigation from '..'

// eslint-disable-next-line react/display-name
jest.mock('components/LinkExtended', () => ({to, children}: {to: string, children: ReactNode}) => <a href={to}>{children}</a>)

test('should match snapshot', () => {
  const {asFragment} = render(<FooterNavigation />)
  expect(asFragment()).toMatchSnapshot()
})

test('should render menu items as links and inactive items as usual text', () => {
  render(<FooterNavigation />)

  const listItems = screen.getAllByRole('listitem')
  const links = screen.getAllByRole('link')
  const inactiveItems = screen.getByRole('list').querySelectorAll('*[aria-disabled="true"]')

  expect(listItems).toHaveLength(7)
  expect(links).toHaveLength(6)
  expect(inactiveItems).toHaveLength(1)
})