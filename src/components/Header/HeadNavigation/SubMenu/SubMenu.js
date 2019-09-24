import React from 'react'
import {instanceOf} from 'prop-types'

import LinkExtended from '../../../LinkExtended'
import styles from './SubMenu.module.css'

const propTypes = {
  pathTitlePairs: instanceOf(Map).isRequired
}

const SubMenu = ({pathTitlePairs}) => {
  const pathes = [...pathTitlePairs.keys()]
  const titles = [...pathTitlePairs.values()]

  return (
    <div className={styles.subMenu}>
      <ul className={styles.list}>
        {titles.map((title, i) => (
          <li key={title} className={styles.listItem}>
            <LinkExtended to={pathes[i]}>
              {title}
            </LinkExtended>
          </li>
        ))}
      </ul>
      <div></div>
      {/* FIXME! */}
      {/* <img src="/img/outerwear.jpg" alt="" className={styles.image} /> */}
    </div>
  )
}

SubMenu.propTypes = propTypes

export default SubMenu