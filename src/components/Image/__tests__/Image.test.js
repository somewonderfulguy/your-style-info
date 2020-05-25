import React from 'react'
import {render} from '@testing-library/react'

import Image from '..'

test('should match snapshot', () => {
  const {asFragment} = render(
    <Image url="path/nice-briefcase.jpg" alt="A man in suit with briefcase and baguette" />
  )
  expect(asFragment()).toMatchSnapshot()
})