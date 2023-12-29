import { MutableRefObject, useEffect, useReducer } from 'react'
import { animated, useTransition } from 'react-spring'

import { useImageLoadQuery } from '~api/imageQueries'
import { useIntersectionObserver, useResizeObserver } from '~shared/hooks'
import { useThemeState } from '~contexts/themeContext'
import { useIsDesktop } from '~contexts/screenDimensionsContext'
import classNames from '~shared/utils/classNames'

import pageStyles from '~components/Page/Page.module.css'
import styles from './Image.module.css'

type Props = {
  url: string
  alt: string
  lowresBase64?: string | null
  width?: number | string
  height: number
  caption?: string
  contentWidth?: 'content' | 'popup' | 'feature' | 'full'
}

// TODO: is it possible to use css aspect-ratio property?
export const getAspectRatio = (width: number, height: number) =>
  (height / width) * 100

// TODO: check mobiles
// TODO: different translations
// TODO: zoom to fullscreen (+ hide fullscreen on scroll)

const Image = ({
  url,
  alt,
  lowresBase64 = null,
  width = '100%',
  height,
  caption,
  contentWidth = 'content'
}: Props) => {
  const isDarkTheme = useThemeState()
  const isDesktop = useIsDesktop()
  const intersectionOffset = isDesktop ? 600 : 350
  const [bindInterObs, isIntersecting, disconnectIntersection] =
    useIntersectionObserver({
      rootMargin: `${intersectionOffset}px 0px ${intersectionOffset}px 0px`
    })
  const bindIntersectionObserver =
    bindInterObs as MutableRefObject<HTMLDivElement>

  const {
    isError,
    isSuccess,
    refetch: retry
  } = useImageLoadQuery(url, {
    enabled: Boolean(!!url && isIntersecting)
  })

  const [bindResObs, { width: imageWidth }] = useResizeObserver()
  const bindResizeObserver = bindResObs as MutableRefObject<HTMLDivElement>
  const isSmallerSize = imageWidth < 424

  type delayedType = {
    delayedShowTitle: boolean
    delayedShowSubtitle: boolean
  }
  const [{ delayedShowTitle, delayedShowSubtitle }, setAppear] = useReducer(
    (s: delayedType, a: Partial<delayedType>) => ({ ...s, ...a }),
    {
      delayedShowTitle: false,
      delayedShowSubtitle: false
    }
  )

  const errorTileTransitions = useTransition(isError, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
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
    leave: { opacity: 0 },
    config: { duration: 400 }
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
    leave: { opacity: 0 },
    config: { duration: 400 }
  })

  useEffect(() => {
    if (isIntersecting) disconnectIntersection()
  }, [disconnectIntersection, isIntersecting])

  useEffect(() => {
    let timerTitle: NodeJS.Timeout | undefined
    let timerSubtitle: NodeJS.Timeout | undefined
    if (isError) {
      timerTitle = setTimeout(() => setAppear({ delayedShowTitle: true }), 400)
      timerSubtitle = setTimeout(
        () => setAppear({ delayedShowSubtitle: true }),
        700
      )
    } else {
      setAppear({
        delayedShowTitle: false,
        delayedShowSubtitle: false
      })
    }
    return () => {
      timerTitle && clearTimeout(timerTitle)
      timerSubtitle && clearTimeout(timerSubtitle)
    }
  }, [isError])

  return (
    <figure
      className={classNames(styles.figure, pageStyles[contentWidth])}
      ref={bindIntersectionObserver}
    >
      <div className={styles.imageContainer} ref={bindResizeObserver}>
        <div
          style={{ ...(contentWidth === 'content' && { maxWidth: width }) }}
          className={
            isError ? styles.aspectRatioOuterError : styles.aspectRatioOuter
          }
        >
          <div
            style={{
              paddingBottom: `${getAspectRatio(
                typeof width === 'string' ? +width.replace(/\D/g, '') : width,
                height
              )}%`
            }}
            className={styles.aspectRatioInner}
            aria-hidden
          >
            <div
              className={styles.preloadPlaceholder}
              style={{ backgroundImage: `url('${lowresBase64}')` }}
            />
          </div>
          {errorTileTransitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div
                  className={styles.errorMessage}
                  role="alert"
                  key={key}
                  style={props}
                >
                  <button
                    className={styles.reloadImageBtn}
                    onClick={() => retry()}
                    type="button"
                  >
                    {titleAppear.map(
                      ({ item, key, props }) =>
                        item && (
                          <animated.span
                            key={key}
                            className={
                              isSmallerSize
                                ? styles.reloadTitleSmaller
                                : styles.reloadTitle
                            }
                            style={props}
                          >
                            {/* TODO: translate */}
                            An error occured during image loading
                          </animated.span>
                        )
                    )}
                    {subtitleAppear.map(
                      ({ item, key, props }) =>
                        item && (
                          <animated.span
                            key={key}
                            style={props}
                            className={styles.reloadSubitle}
                          >
                            {/* TODO: translate */}
                            Click on this to try to load again.
                          </animated.span>
                        )
                    )}
                  </button>
                  <div
                    className={
                      isDarkTheme ? styles.outlineDark : styles.outline
                    }
                  />
                </animated.div>
              )
          )}
        </div>
        {isSuccess && (
          <img
            src={url}
            alt={alt}
            className={styles.imgAbsolute}
            style={{ ...(contentWidth !== 'content' && { width: '100%' }) }}
          />
        )}
      </div>
      {caption && (
        <figcaption
          className={isDarkTheme ? styles.captionDark : styles.caption}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default Image
