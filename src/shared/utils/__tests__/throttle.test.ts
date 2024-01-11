import throttle from '../throttle'

test('throttle works', async () => {
  // fake data to test
  let i = 0
  let k = 0

  const spyObject = {
    fnToThrottleOne: () => {
      i++
      return i
    },
    fnToThrottleTwo: () => {
      k++
      return k
    }
  }
  jest.spyOn(spyObject, 'fnToThrottleOne')
  jest.spyOn(spyObject, 'fnToThrottleTwo')

  // single call, without delay parameter
  const throttledFnOne = throttle(spyObject.fnToThrottleOne)
  expect(throttledFnOne()).toBe(1)
  expect(spyObject.fnToThrottleOne).toHaveBeenCalledTimes(1)

  // multiple calls with delay executes function on start and only once at the end
  const throttledFnTwo = throttle(spyObject.fnToThrottleTwo, 50)
  throttledFnTwo()
  throttledFnTwo()
  throttledFnTwo()
  throttledFnTwo()
  expect(throttledFnTwo()).toBe(1)
  expect(spyObject.fnToThrottleTwo).toHaveBeenCalledTimes(1)
  await new Promise((r) => setTimeout(r, 50))
  expect(throttledFnTwo()).toBe(2)
  expect(spyObject.fnToThrottleTwo).toHaveBeenCalledTimes(2)

  // `this` context test using .bind
  class Counter {
    count = 0

    increment() {
      this.count++
    }
  }
  const counter = new Counter()
  const throttledIncrement = throttle(counter.increment.bind(counter))

  setTimeout(() => throttledIncrement())

  expect(counter.count).toBe(0)
  await new Promise((r) => setTimeout(r))
  expect(counter.count).toBe(1)

  // TODO: test for calling with parameters (make sure that parameters are working correctly)
})
