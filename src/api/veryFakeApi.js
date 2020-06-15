import Promise from 'bluebird'

const pagePathPair = new Map([
  ['/en', '/json/trench-coat-en.json'],
  ['/en/', '/json/trench-coat-en.json'],
  ['/ru', '/json/trench-coat-ru.json'],
  ['/ru/', '/json/trench-coat-ru.json'],
  ['/en/guides-topics', '/json/outerwear.json'],
  ['/ru/guides-topics', '/json/outerwear.json'],
  ['/en/clothes', '/json/pea-coat.json'],
  ['/ru/clothes', '/json/pea-coat.json'],
  ['/en/grooming', '/json/quilted-jacket.json'],
  ['/ru/grooming', '/json/quilted-jacket.json'],
  ['/en/brands-stores', '/json/accessories.json'],
  ['/ru/brands-stores', '/json/accessories.json'],
  ['/en/glossary', '/json/glossary.json'],
  ['/ru/glossary', '/json/glossary.json'],
  ['/en/mixed', '/json/blog.json'],
  ['/ru/mixed', '/json/blog.json'],
  ['/en/outerwear/trench-coat', '/json/trench-coat-en.json'],
  ['/ru/outerwear/trench-coat', '/json/trench-coat-ru.json']
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