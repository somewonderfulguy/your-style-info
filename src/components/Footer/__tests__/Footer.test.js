import React from 'react'
import {render} from '@testing-library/react'

import Footer from '..'

// TODO remove mocks and do integrational tests
jest.mock('components/DarkThemeSwitcher', () => () => 'MockDarkThemeSwitcher')
jest.mock('components/LangSelector', () => () => 'MockLangSelector')
jest.mock('components//SocialMediaIcons', () => () => 'MockSocialMediaIcons')
jest.mock('components/Footer/FooterNavigation', () => () => 'MockFooterNavigation')

test('should match snapshot', () => {
  const {asFragment} = render(<Footer />)
  expect(asFragment()).toMatchSnapshot()
})