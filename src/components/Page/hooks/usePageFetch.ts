import {useEffect, useState} from 'react'

import {usePageQuery, pageType} from 'api'

export const usePageFetch = pathname => {
  const [{header, components}, setPageData] = useState<pageType>({
    id: '',
    header: '',
    components: []
  })

  const { data } = usePageQuery(pathname, {enabled: true})
  useEffect(() => void (data && setPageData(data)), [data])

  return {header, components}
}