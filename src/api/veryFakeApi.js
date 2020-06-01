import Promise from 'bluebird'

const pagePathPair = new Map([
  ['/en', '/json/home.json'],
  ['/ru', '/json/home.json'],
  ['/en/guides-topics', '/json/outerwear.json'],
  ['/ru/guides-topics', '/json/outerwear.json'],
  ['/en/clothes', '/json/pea-coat.json'],
  ['/ru/clothes', '/json/pea-coat.json'],
  ['/en/grooming', '/json/quilted-jacket.json'],
  ['/ru/grooming', '/json/quilted-jacket.json'],
  ['/en/outerwear/trench-coat', '/json/trench-coat-en.json'],
  ['/ru/outerwear/trench-coat', '/json/trench-coat-ru.json'],
  ['/en/brands-stores', '/json/accessories.json'],
  ['/ru/brands-stores', '/json/accessories.json'],
  ['/en/glossary', '/json/glossary.json'],
  ['/ru/glossary', '/json/glossary.json'],
  ['/en/mixed', '/json/blog.json'],
  ['/ru/mixed', '/json/blog.json']
])

let promise = Promise.resolve()

export const getPageData = page => {
  promise.cancel()

  return promise = new Promise((resolve, reject, onCancel) => {
    fetch(pagePathPair.get(page))
      .then(resolve)
      .catch(reject)
  })
}

// FIXME
// works, but event.total is always 0; with that it doesn't work as expected
// regardless, leaving this code untouched until find a way to fix event.total
// (maybe to fix it, I need to setup backend)
export const getPageDataNew = (page, onProgress) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', page)
  xhr.send()

  xhr.onload = () => console.log('loaded!!!')

  xhr.onprogress = event => {
    console.log('lengthComputable', event.lengthComputable)
    console.log(`got ${event.loaded} from ${event.total}`)
  }

  xhr.onerror = () => console.log('error happened')

  // xhr.timeout = () => {}

  // xhr.abort()
}