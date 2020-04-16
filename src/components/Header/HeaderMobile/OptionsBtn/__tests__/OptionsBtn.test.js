import React from 'react'
import {render} from '@testing-library/react'

import OptionsBtn from '../'

test('should match snapshot', () => {
  const {asFragment} = render(<OptionsBtn />)
  expect(asFragment()).toMatchSnapshot()
})