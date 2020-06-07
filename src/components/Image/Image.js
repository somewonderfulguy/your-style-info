import React, {useLayoutEffect, useEffect, useState} from 'react'
import {number, string} from 'prop-types'

import {imgPreloadPromise} from 'shared/utils'
import {useTheme} from 'contexts'
import styles from './Image.module.css'

const propTypes = {
  url: string.isRequired,
  alt: string.isRequired,
  lowresBase64: string,
  width: number,
  height: number,
  caption: string
}

const defaultProps = {
  lowresBase64: null,
  width: '100%'
}

export const getAspectRatio = (width, height) => height / width * 100

const initState = {isLoaded: false, isPreviewHidden: false}

// TODO: handle error with retry msg
// TODO: check mobiles

const Image = ({url, alt, lowresBase64, width, height, caption}) => {
  const [state, setState] = useState(initState)
  const {isLoaded, isPreviewHidden} = state
  const {isDarkTheme} = useTheme()

  useLayoutEffect(() => void setState(initState), [url])

  useEffect(() => {
    const [promise, cancel] = imgPreloadPromise(url)
    promise
      .then(() => {
        setState({isLoaded: true, isPreviewHidden: false})
        setTimeout(() => {
          setState({isLoaded: true, isPreviewHidden: true})
        }, 500)
        return null // Bluebird is an idiot, requires return something
      })
      .catch(() => console.warn('holly crap!'))
    return cancel
  }, [url])

  const paddingBottom = `${getAspectRatio(width, height)}%`

  return (
    <figure className={styles.figure}>
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
      {caption && (
        <figcaption className={isDarkTheme ? styles.captionDark : styles.caption}>{caption}</figcaption>
      )}
    </figure>
  )
}

Image.propTypes = propTypes
Image.defaultProps = defaultProps

export default Image