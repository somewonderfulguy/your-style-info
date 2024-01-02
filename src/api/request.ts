const baseUrl = '' // process.env. ...

export const request = <TResponse, TError = unknown>(
  endpoint: string,
  { body, ...customConfig }: RequestInit = {}
): Promise<TResponse> => {
  const isFormData = body instanceof FormData

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...customConfig.headers
    }
  }

  if (body) config.body = isFormData ? body : JSON.stringify(body)

  return fetch(`${baseUrl}/${endpoint}`, config).then(async (response) => {
    let data: TResponse | TError

    if (response.status === 401) {
      // handle unauthorized, if needed
      console.error('Unauthorized')
    }

    try {
      // handle empty responses
      if (
        response.status === 200 &&
        // eslint-disable-next-line eqeqeq
        response.headers.get('Content-Type') == null
      ) {
        return Promise.resolve() as unknown as TResponse
      }

      // handle files
      if (
        response.headers
          .get('Content-Type')
          ?.includes('application/octet-stream')
      ) {
        const blob = await response.blob()
        const contentDisposition = response.headers.get('Content-Disposition')

        if (contentDisposition && contentDisposition.includes('filename=')) {
          const fileName = contentDisposition
            .split('filename=')[1]
            .split(';')[0]
          data = new File([blob], fileName) as unknown as TResponse
        } else {
          data = blob as unknown as TResponse
        }
        // handle text
      } else if (response.headers.get('Content-Type')?.includes('text/plain')) {
        data = (await response.text()) as unknown as TResponse
        // handle json
      } else {
        data = await response.json()
      }
    } catch (e) {
      console.error(e)
      throw new Error('Error while parsing response')
    }

    if (response.ok) {
      return data as TResponse
    } else {
      return Promise.reject(data as TError)
    }
  })
}
