import React, {useMemo} from 'react'
import {shape, string} from 'prop-types'
import {animated, useTransition} from 'react-spring'

import {componentRenderer} from './helpers'
import FooterContent from './FooterContent'
import {usePrevious} from 'shared/hooks'
import {useHeaderHeightState, useIsDesktop} from 'contexts'
import {useFooterAnimation, usePageFetch} from './hooks'
import styles from './Page.module.css'

const propTypes = {
  location: shape({
    pathname: string.isRequired
  }).isRequired
}

const Page = ({location: {pathname}}) => {
  const headerHeight = useHeaderHeightState()
  const isDesktop = useIsDesktop()

  const previousPath = String(usePrevious(pathname))
  const removeLangInPath = str => str.replace(/^\/\w{2}/, '')
  const isLocaleChanged = useMemo(() => (
    removeLangInPath(previousPath) === removeLangInPath(pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [pathname])

  const {id, header, components} = usePageFetch(pathname, isLocaleChanged)
  const pageContent = useMemo(() => (
    <>
      {header && <h1 style={{marginTop: 0}}>{header}</h1>}
      {!!components.length && componentRenderer(components)}
    </>
  ), [components, header])

  const {
    shadowRenderRef, pageContainerRef, footerRef, page, footerSpring, pageHeightSpring
  } = useFooterAnimation(id, headerHeight, pageContent, isDesktop)

  const pageTransitions = useTransition(page.content, page.id, {
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
        {/* invisible block that renders content before animation so the upcoming height of page becomes known */}
        <div className={styles.shadowRender}>
          <div className={styles.pageContainer} style={{height: 'auto'}} ref={shadowRenderRef}>
            <div className={styles.page}>{pageContent}</div>
          </div>
        </div>
        <animated.div className={styles.pageContainer} style={pageHeightSpring} ref={pageContainerRef}>
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
        </animated.div>
      </div>
      <animated.footer className={styles.footer} ref={footerRef} style={footerSpring}>
        <FooterContent />
      </animated.footer>
    </>
  )
}

Page.propTypes = propTypes

export default Page