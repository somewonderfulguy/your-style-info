const baseUrl = '' // process.env. ...

const request = (endpoint: string, {body, ...customConfig}: RequestInit = {}) => {
  const headers = {'Content-Type': 'application/json'}

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }

  if(body) config.body = JSON.stringify(body)

  return fetch(`${baseUrl}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      if(response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {request}