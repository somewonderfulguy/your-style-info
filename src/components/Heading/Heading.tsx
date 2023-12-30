import { HeadingComponent } from '~api/componentTypes'
import classNames from '~shared/utils/classNames'

import pageStyles from '~components/Page/Page.module.css'
import styles from './Heading.module.css'

const Heading = ({
  children,
  level = 2,
  contentWidth = 'content'
}: HeadingComponent) => {
  const HTag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <HTag className={classNames(styles.heading, pageStyles[contentWidth])}>
      {children}
    </HTag>
  )
}

export default Heading
