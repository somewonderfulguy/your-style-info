/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounce = (func: (...args: any[]) => any, delay = 0) => {
  let timeout: NodeJS.Timeout | undefined

  return (...args: any[]): any => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
