import React, {useEffect, useReducer} from 'react'
import {number, string} from 'prop-types'
import {animated, useTransition} from 'react-spring'

import {useImageLoad} from './hooks'
import {useTheme} from 'contexts'
import styles from './Image.module.css'

const propTypes = {
  url: string.isRequired,
  alt: string.isRequired,
  lowresBase64: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  caption: string
}

const defaultProps = {
  lowresBase64: null,
  width: '100%'
}

export const getAspectRatio = (width, height) => height / width * 100

// TODO: check mobiles
// TODO: different translations
// TODO: zoom to fullscreen (+ hide fullscreen on scroll)

const Image = ({url, alt, lowresBase64, width, height, caption}) => {
  const {isRejected, isResolved, isPreviewVisible, retry} = useImageLoad(url)
  const {isDarkTheme} = useTheme()

  const [{delayedShowTitle, delayedShowSubtitle}, setAppear] = useReducer(
    (s, a) => ({...s, ...a}), {
      delayedShowTitle: false,
      delayedShowSubtitle: false
    }
  )

  const errorTileTransitions = useTransition(isRejected, null, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0}
  })

  const titleAppear = useTransition(delayedShowTitle, null, {
    from: {
      opacity: 0,
      top: `calc(50% - 19px)`
    },
    enter: {
      opacity: 1,
      top: `calc(50% - 39px)`
    },
    leave: {opacity: 0},
    config: {duration: 400}
  })

  const subtitleAppear = useTransition(delayedShowSubtitle, null, {
    from: {
      opacity: 0,
      top: `calc(50% + 30px)`
    },
    enter: {
      opacity: 1,
      top: `calc(50% + 20px)`
    },
    leave: {opacity: 0},
    config: {duration: 400}
  })

  useEffect(() => {
    let timerTitle, timerSubtitle
    if(isRejected) {
      timerTitle = setTimeout(() => setAppear({delayedShowTitle: true}), 400)
      timerSubtitle = setTimeout(() => setAppear({delayedShowSubtitle: true}), 700)
    } else {
      setAppear({
        delayedShowTitle: false,
        delayedShowSubtitle: false
      })
    }
    return () => {
      clearTimeout(timerTitle)
      clearTimeout(timerSubtitle)
    }
  }, [isRejected])

  return (
    <figure className={styles.figure}>
      <div className={styles.imageContainer}>
        {isPreviewVisible && (
          <div
            style={{maxWidth: width}}
            className={isRejected ? styles.aspectRatioOuterError : styles.aspectRatioOuter}
          >
            <div style={{paddingBottom: `${getAspectRatio(width, height)}%`}} className={styles.aspectRatioInner}>
              <div
                className={styles.preloadPlaceholder}
                style={{backgroundImage: `url('${lowresBase64}')`}}
              />
            </div>
            {errorTileTransitions.map(({item, key, props}) => (
              item && (
                <animated.div className={styles.errorMessage} role="alert" key={key} style={props}>
                  <button
                    className={styles.reloadImageBtn}
                    onClick={retry}
                    type="button"
                  >
                    {titleAppear.map(({item, key, props}) => (
                      item && (
                        <animated.span key={key} className={styles.reloadTitle} style={props}>
                          An error occured during image loading
                        </animated.span>
                      )
                    ))}
                    {subtitleAppear.map(({item, key, props}) => (
                      item && (
                        <animated.span key={key} style={{position: 'absolute', ...props}}>
                          Click on this to try to load again.
                        </animated.span>
                      )
                    ))}
                  </button>
                  <div className={isDarkTheme ? styles.outlineDark : styles.outline} />
                </animated.div>
              )
            ))
            }
          </div>
        )}
        {isResolved && (
          <img src={url} alt={alt} className={isPreviewVisible ? styles.imgAbsolute : styles.img} />
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