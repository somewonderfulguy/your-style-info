import { AnyFunctionType } from '~types/common'

const throttle = <T extends AnyFunctionType>(
  func: T,
  delay = 0
): ((...args: Parameters<T>) => ReturnType<T>) => {
  let isThrottled = false
  let savedArgs: Parameters<T> | null = null
  let result: ReturnType<T>

  const wrapper = (...args: Parameters<T>): ReturnType<T> => {
    if (isThrottled) {
      savedArgs = args
      return result
    }

    setTimeout(() => {
      isThrottled = false
      if (savedArgs) {
        wrapper(...savedArgs)
        savedArgs = null
      }
    }, delay)

    isThrottled = true
    result = func(...args)
    return result
  }

  return wrapper
}

export default throttle
