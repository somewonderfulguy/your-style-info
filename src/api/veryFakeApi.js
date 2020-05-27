import Promise from 'bluebird'

const pagePathPair = new Map([
  ['/', '/json/home.json'],
  ['/outerwear', '/json/outerwear.json'],
  ['/outerwear/pea-coat', '/json/pea-coat.json'],
  ['/outerwear/quilted-jacket', '/json/quilted-jacket.json'],
  ['/outerwear/trench-coat', '/json/trench-coat.json'],
  ['/en/outerwear/trench-coat', '/json/trench-coat-en.json'],
  ['/ru/outerwear/trench-coat', '/json/trench-coat-ru.json'],
  ['/accessories', '/json/accessories.json'],
  ['/accessories/carry', '/json/carry.json'],
  ['/glossary', '/json/glossary.json'],
  ['/blog', '/json/blog.json'],
  ['/about', '/json/about.json']
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