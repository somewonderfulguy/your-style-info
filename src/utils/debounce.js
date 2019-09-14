export const debounce = (func, delay) => {
  let timeout

	return (...args) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
      timeout = null
			func.apply(this, args)
    }, delay)
	}
}