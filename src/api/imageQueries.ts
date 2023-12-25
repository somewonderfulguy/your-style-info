import { useQuery, UseQueryOptions } from 'react-query'

import { imgPreloadPromise } from '~shared/utils'

export const useImageLoadQuery = (imageUrl: string, options: UseQueryOptions) =>
  //@ts-expect-error fix later
  useQuery(['image', imageUrl], () => imgPreloadPromise(imageUrl), options)
