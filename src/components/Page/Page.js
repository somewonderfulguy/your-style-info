import React, {useMemo} from 'react'
import {shape, string} from 'prop-types'
import {animated, useTransition} from 'react-spring'

// TODO componentRenderer should be colocated
import {componentRenderer} from 'shared'
import Footer from 'components/Footer'
import {usePrevious} from 'shared/hooks'
import {useHeaderHeight, useScreenDimensions} from 'contexts'
import {useFooterAnimation, usePageFetch} from './hooks'
import styles from './Page.module.css'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired
}

const Page = ({location: {pathname}}) => {
  const {headerHeight} = useHeaderHeight()
  const {isDesktop} = useScreenDimensions()
  const [bindResizeObserver, footerRef, {pageHeight}] = useFooterAnimation(headerHeight)

  const previousPath = String(usePrevious(pathname))
  const removeLangInPath = str => str.replace(/^\/\w{2}/, '')
  const isLocaleChanged = useMemo(() => (
    removeLangInPath(previousPath) === removeLangInPath(pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [pathname])

  const {header, components} = usePageFetch(pathname, isLocaleChanged)

  const pageContent = (
    <>
      <h1 style={{marginTop: 0}}>{header}</h1>
      {!!components.length && componentRenderer(components)}
    </>
  )

  const pageTransitions = useTransition(pageContent, header, {
    config: {duration: 700},
    from: {
      opacity: 0,
      transform: `translateY(${isLocaleChanged ? 0 : 33}px)`
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {opacity: 0}
  })

  return (
    <>
      <div>
        <animated.div className={styles.pageContainer} style={{height: pageHeight}}>
          <div ref={bindResizeObserver}>
            {pageTransitions.map(({item, key, props, state}) => (
              !!item && (
                <animated.main
                  className={state === 'leave' ? styles.pageLeave : styles.page}
                  style={{
                    ...props,
                    paddingTop: isDesktop ? 0 : headerHeight
                  }}
                  key={key}
                >
                  {item}
                </animated.main>
              )
            ))}
          </div>
        </animated.div>
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  )
}

Page.propTypes = propTypes

export default Page