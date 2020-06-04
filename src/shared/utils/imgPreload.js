import Promise from 'bluebird'

export const imgPreload = (imgUrlArr, idx = 0) => {
  if(imgUrlArr && imgUrlArr.length > idx) {
    const img = new Image()
    img.onload = () => imgPreload(imgUrlArr, idx + 1)
    img.src = imgUrlArr[idx]
  }
}

export const imgPreloadPromise = src => {
  let promise = Promise.resolve()

  const cancel = () => promise.cancel()

  promise = new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Error during loading ${src}`))
  })

  return [promise, cancel]
}