export const imgPreload = (imgUrlArr: string[], idx = 0) => {
  if(imgUrlArr && imgUrlArr.length > idx) {
    const img = new Image()
    img.onload = () => imgPreload(imgUrlArr, idx + 1)
    img.src = imgUrlArr[idx]
  }
}

export const imgPreloadPromise = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Error during loading ${src}`))
  })