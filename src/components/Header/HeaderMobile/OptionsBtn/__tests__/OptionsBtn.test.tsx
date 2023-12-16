import React, { FunctionComponent } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { ThemeProvider } from 'contexts'
import OptionsBtn from '..'
import { renderWholeApp, userEvent } from 'shared/tests'

const setup = () =>
  render(<OptionsBtn />, { wrapper: ThemeProvider as FunctionComponent })

test('snapshot diffrenece between default and clicked states', async () => {
  const { container, rerender } = setup()
  const dots = container.querySelectorAll('.dot')

  const defaultStyles = [
    { top: '0px', width: '4px', height: '4px', borderRadius: '50%' },
    { width: '4px', height: '4px', opacity: '1' },
    { bottom: '0px', width: '4px', height: '4px', borderRadius: '50%' }
  ]
  const clickedStyles = [
    { top: '-1px', width: '24px', height: '2px' },
    { width: '4px', height: '4px', opacity: '0' },
    { bottom: '-1px', width: '24px', height: '2px' }
  ]

  // default state asserts
  dots.forEach((dot, idx) => expect(dot).toHaveStyle(defaultStyles[idx]))

  rerender(<OptionsBtn isOpen />)

  // clicked state asserts
  await waitFor(() =>
    dots.forEach((dot, idx) => expect(dot).toHaveStyle(clickedStyles[idx]))
  )
})

test('snapshot difference in dark/light theme', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.innerWidth = 320

  renderWholeApp()

  const optionsBtn = screen.getByTitle(/options/i)
  const lightThemeClass = optionsBtn.className

  userEvent.click(screen.getAllByLabelText(/switch theme/i)[0])

  const darkThemeClass = optionsBtn.className

  expect(lightThemeClass).toMatchDiffSnapshot(darkThemeClass, {
    contextLines: 0,
    aAnnotation: 'light theme',
    bAnnotation: 'dark theme'
  })
})
