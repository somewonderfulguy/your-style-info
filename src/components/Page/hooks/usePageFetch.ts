import { useEffect, useState } from 'react'

import { usePageQuery, PageType } from '~api/pageApi'

// state duplication is necessary because of complex animations - in order to make
// transition, we need to know both current and upcoming page data
export const usePageFetch = (pathname: string) => {
  const [{ id, header, components }, setPageData] = useState<PageType>({
    id: '',
    header: '',
    components: []
  })

  const { data } = usePageQuery(pathname, { enabled: true })
  useEffect(() => void (data && setPageData(data)), [data])

  return { id, header, components }
}
