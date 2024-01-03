import React from 'react'
import { render } from '@testing-library/react'
import { TextComponent } from '~api/pageApi'

import TextBlock from '..'

test('should match snapshot', () => {
  const { asFragment } = render(
    <TextBlock type={'text' as TextComponent['type']}>
      {`Buying cheap shoes is not money saving. It's madness.`}
    </TextBlock>
  )
  expect(asFragment()).toMatchSnapshot()
})
