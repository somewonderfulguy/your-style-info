import React from 'react'
import { render } from '@testing-library/react'

import TextBlock from '..'

test('should match snapshot', () => {
  const { asFragment } = render(
    <TextBlock text="Buying cheap shoes is not money saving. It's madness." />
  )
  expect(asFragment()).toMatchSnapshot()
})
