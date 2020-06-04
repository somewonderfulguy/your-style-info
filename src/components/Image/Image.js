import React, {useLayoutEffect, useEffect, useState} from 'react'
import {number, string} from 'prop-types'

import {imgPreloadPromise} from 'shared/utils'
import styles from './Image.module.css'

const propTypes = {
  url: string.isRequired,
  alt: string.isRequired,
  lowresBase64: string,
  width: number,
  height: number
}

const defaultProps = {
  lowresBase64: null,
  width: '100%'
}

const getAspectRatio = (width, height) => height / width * 100

const initState = {isLoaded: false, isPreviewHidden: false}

// TODO implement image captions
// TODO: handle error with retry msg

const Image = ({url, alt, lowresBase64, width, height}) => {
  const [state, setState] = useState(initState)
  const {isLoaded, isPreviewHidden} = state

  useLayoutEffect(() => void setState(initState), [url])

  useEffect(() => {
    const [promise, cancel] = imgPreloadPromise(url)
    promise
      .then(() => {
        setState({isLoaded: true, isPreviewHidden: false})
        setTimeout(() => {
          setState({isLoaded: true, isPreviewHidden: true})
        }, 2000)
        return null // Bluebird is an idiot, requires return something
      })
      .catch(() => console.warn('holly crap!'))
    return cancel
  }, [url])

  const paddingBottom = `${getAspectRatio(width, height)}%`

  return (
    <figure>
      <div className={styles.imageContainer}>
        {!isPreviewHidden && (
          <div style={{maxWidth: width}} className={styles.aspectRatioOuter}>
            <div style={{paddingBottom}} className={styles.aspectRatioInner}>
              <div
                className={styles.preloadPlaceholder}
                style={{backgroundImage: `url('${lowresBase64}')`}}
              />
            </div>
          </div>
        )}
        {isLoaded && (
          <img src={url} alt={alt} className={isPreviewHidden ? styles.img : styles.imgAbsolute} />
        )}
      </div>
    </figure>
  )
}

Image.propTypes = propTypes
Image.defaultProps = defaultProps

export default Image