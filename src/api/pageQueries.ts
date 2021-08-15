import {useQuery, UseQueryOptions} from 'react-query'

import {request, pagePathPair, imageComponent, textComponent} from '.'

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
  // if(!url) throw new Error(`unexpected path: ${path}`) // TODO display such errors in UI so the user know that his request didn't work

  const TEMP_URL = url?.substring(1) // will not be needed when it comes to real api requests (not local)
  return useQuery(
    ['page', path],
    () => getPage(TEMP_URL ?? ''),
    {enabled: !!url, ...options}
  )
}