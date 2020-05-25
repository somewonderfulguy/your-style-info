export const imgPreload = (imgUrlArr, idx = 0) => {
  if(imgUrlArr && imgUrlArr.length > idx) {
    const img = new Image()
    img.onload = () => imgPreload(imgUrlArr, idx + 1)
    img.src = imgUrlArr[idx]
  }
}