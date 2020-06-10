import {useEffect, useLayoutEffect, useReducer, useState} from 'react'

import {imgPreloadPromise} from 'shared/utils'

const initState = {status: 'idle', isPreviewVisible: true}

export const useImageLoad = (url) => {
  const [update, forceUpdate] = useState(0)

  const [state, setState] = useReducer((s, a) => ({...s, ...a}), {
    status: 'idle',
    isPreviewVisible: true
  })

  useLayoutEffect(() => void setState(initState), [url])

  useEffect(() => {
    setState({status: 'pending', isPreviewVisible: true})

    const [promise, cancel] = imgPreloadPromise(url)
    let timer

    promise
      .then(() => {
        setState({status: 'resolved'})
        timer = setTimeout(() => {
          setState({isPreviewVisible: false})
        }, 500)
        return null // Bluebird is an idiot, requires return something
      })
      .catch(() => setState({status: 'rejected'}))
    return () => {
      cancel()
      clearTimeout(timer)
    }
  }, [url, update])

  return {
    isRejected: state.status === 'rejected',
    isResolved: state.status === 'resolved',
    retry: () => forceUpdate(f => f + 1),
    ...state
  }
}