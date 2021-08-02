import {useQuery, UseQueryOptions} from 'react-query'

import {request, imageComponent, textComponent} from '.'

const pagePathPair = new Map([
  ['/en', '/json/trench-coat-en.json'],
  ['/ru', '/json/trench-coat-ru.json'],
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
  ['/ru/mixed', '/json/blog.json']
])

type component =
  imageComponent
  | textComponent

export type pageType = {
  id: string
  header: string
  components: component[]
}

const getPage = (url: string) => request<pageType>(url)

export const usePageQuery = (rawPath: string, options: UseQueryOptions<pageType>) => {
  const path = rawPath[rawPath.length - 1] === '/' ? rawPath.slice(0, -1) : rawPath
  const url = pagePathPair.get(path)
  if(!url) throw new Error(`unexpected path: ${path}`) // TODO display such errors in UI so the user know that his request didn't work

  const TEMP_URL = url.substring(1) // will not be needed when it comes to real api requests (not local)
  return useQuery(
    ['page', path],
    () => getPage(TEMP_URL),
    {enabled: !!url, ...options}
  )
}