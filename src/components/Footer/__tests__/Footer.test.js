import React from 'react'
import {render} from '@testing-library/react'

import Footer from '..'

jest.mock('components/DarkThemeSwitcher', () => () => 'MockDarkThemeSwitcher')
jest.mock('components/LangSelector', () => () => 'MockLangSelector')
jest.mock('components//SocialMediaIcons', () => () => 'MockSocialMediaIcons')
jest.mock('components/Footer/FooterNavigation', () => () => 'MockFooterNavigation')

test('should match snapshot', () => {
  const {asFragment} = render(<Footer />)
  expect(asFragment()).toMatchSnapshot()
})