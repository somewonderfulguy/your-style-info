import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { request } from '../request'
import { pagePathPair } from '../apiConstants'
import { PageType } from './pageTypes'

const getPage = (url: string) => request<PageType>(url)

export const usePageQuery = (
  rawPath: string,
  options: Omit<UseQueryOptions<PageType>, 'queryKey'> = {}
) => {
  const path =
    rawPath[rawPath.length - 1] === '/' ? rawPath.slice(0, -1) : rawPath
  const url = pagePathPair.get(path)
  // if(!url) throw new Error(`unexpected path: ${path}`) // TODO display such errors in UI so the user know that his request didn't work

  const TEMP_URL = url?.substring(1) // will not be needed when it comes to real api requests (not local)
  return useQuery({
    queryFn: () => getPage(TEMP_URL ?? ''),
    queryKey: ['page', path],
    enabled: !!url,
    ...options
  })
}
