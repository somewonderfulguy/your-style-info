import React, {Fragment, memo, useState, useRef} from 'react'
import {bool, func, object, string} from 'prop-types'
import {animated, useTransition} from 'react-spring'

import LinkExtended from 'components/LinkExtended'
import {usePrevious} from 'shared/hooks'
import {useLocalization, useTheme} from 'contexts'
import styles from './SubMenuContent.module.css'

const propTypes = {
  menuItems: object.isRequired,
  basePath: string,
  mainThumbnail: object,
  isOpen: bool,
  setMenuOpen: func.isRequired
}

const defaultProps = {
  basePath: '',
  mainThumbnail: null,
  isOpen: false
}

const SubMenuContent = ({menuItems, basePath, mainThumbnail, isOpen, setMenuOpen}) => {
  const {isDarkTheme} = useTheme()
  const [, , {data: translations}] = useLocalization()
  const [subItemThumbnail, setSubItemThumbnail] = useState(null)
  const prevOpen = usePrevious(isOpen)

  // old transitions clean up
  const transitionCancelArray = useRef([])
  transitionCancelArray.current.forEach((cancel, idx) => idx >= 1 && cancel())
  transitionCancelArray.current.splice(2)

  const transitions = useTransition(subItemThumbnail || mainThumbnail, item => item && item.url, {
    config: {duration: isOpen !== prevOpen ? 0 : 200},
    from: {opacity: 0},
    enter: () => async (next, cancel) => {
      transitionCancelArray.current.unshift(cancel)
      await next({opacity: 1})
    },
    leave: {opacity: 0}
  })

  return (
    <>
      <ul className={styles[isDarkTheme ? 'listDark' : 'list']}>
        {Object.entries(menuItems).map(([path, {name, thumbnail, inactive}]) => (
          <li
            key={name}
            className={styles.listItem}
          >
            <LinkExtended
              to={basePath + path}
              inactive={inactive}
              className={styles.link}
              activeClassName={styles.activeItem}
              onMouseEnter={() => thumbnail && setSubItemThumbnail(thumbnail)}
              onMouseLeave={() => thumbnail && setSubItemThumbnail(null)}
              onClick={() => setMenuOpen(false)}
            >
              {translations.navigation[path]}
            </LinkExtended>
          </li>
        ))}
      </ul>

      {transitions.map(({item, key, props: {opacity}}) => (
        <Fragment key={key}>
          <div className={styles.heightFill} />
          <animated.img
            src={(item && item.url)}
            className={styles.image}
            style={{
              // when menu opens / closes opacity.value sometimes becomes NaN and a warning
              // in console happens - this isNaN check is a simple fix
              opacity: typeof opacity.value !== 'undefined' && isNaN(opacity.value) ? 1 : opacity,
              background: (item && item.background) || '#7d7d7d4c'
            }}
            alt={(item && item.alt) || ''}
          />
        </Fragment>
      ))}
    </>
  )
}

SubMenuContent.propTypes = propTypes
SubMenuContent.defaultProps = defaultProps

export default memo(SubMenuContent)