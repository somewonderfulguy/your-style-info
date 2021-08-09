/* eslint-disable @typescript-eslint/no-explicit-any */

export const throttle = (func: (...args: any[]) => any, delay = 0) => {
  let isThrottled = false
  let savedArgs: any[] | null

  const wrapper = (...args) => {
    if(isThrottled) {
      savedArgs = args
      return
    }

    func(...args)
    isThrottled = true

    setTimeout(() => {
      isThrottled = false
      if(savedArgs) {
        wrapper(savedArgs)
        savedArgs = null
      }
    }, delay)
  }

  return wrapper
}