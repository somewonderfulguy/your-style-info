import React from 'react'
import {render} from '@testing-library/react'
import snapshotDiff from 'snapshot-diff'

import SocialMediaIcons from '..'

jest.mock('assets/images/social-media-svg-icons')

const setup = (color, small) => (
  render(<SocialMediaIcons color={color} small={small} />)
)

test('snapshot difference: 1) default sizes and colour, 2) smaller sizes, lightgray colour', () => {
  expect(
    snapshotDiff(
      setup().asFragment(),
      setup('lightgray', true).asFragment()
    )
  ).toMatchSnapshot()
})