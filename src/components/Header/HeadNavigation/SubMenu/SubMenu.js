import React from 'react'
import {instanceOf, string} from 'prop-types'

import LinkExtended from '../../../LinkExtended'
import styles from './SubMenu.module.css'

const propTypes = {
  pathTitlePairs: instanceOf(Map),
  basePath: string
}

const defaultProps = {
  pathTitlePairs: new Map(),
  basePath: ''
}

const SubMenu = ({pathTitlePairs, basePath}) => {
  const pathes = [...pathTitlePairs.keys()]
  const titles = [...pathTitlePairs.values()]

  return (
    <div className={styles.subMenu}>
      <ul className={styles.list}>
        {titles.map((title, i) => (
          <li key={title} className={styles.listItem}>
            <LinkExtended to={basePath + pathes[i]}>
              {title}
            </LinkExtended>
          </li>
        ))}
      </ul>
      {/* FIXME! add images and they can be transitioned */}
      {/* <img src="/img/outerwear.jpg" alt="" className={styles.image} /> */}
    </div>
  )
}

SubMenu.propTypes = propTypes
SubMenu.defaultProps = defaultProps

export default SubMenu