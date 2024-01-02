import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { imgPreloadPromise } from '~shared/utils'

export const useImageLoadQuery = (
  imageUrl: string,
  options: Omit<UseQueryOptions<HTMLImageElement>, 'queryKey'> = {}
) =>
  useQuery({
    queryFn: () => imgPreloadPromise(imageUrl),
    queryKey: ['image', imageUrl],
    enabled: !!imageUrl,
    ...options
  })
