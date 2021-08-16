import {anyFunctionType} from '..'

export const throttle = (func: anyFunctionType, delay = 0) => {
  let isThrottled = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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