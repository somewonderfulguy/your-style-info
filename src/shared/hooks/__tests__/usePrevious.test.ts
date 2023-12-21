import { renderHook } from '@testing-library/react-hooks'

import { usePrevious } from '..'

test('should return previous value if value updates (null is inital value)', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => usePrevious(initialValue),
    { initialProps: { initialValue: 'Trench' } }
  )

  expect(result.current).toBeNull()

  rerender({ initialValue: 'coat' })
  expect(result.current).toBe('Trench')

  rerender({ initialValue: 'outerwear' })
  expect(result.current).toBe('coat')
})
