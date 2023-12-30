import { HeadingComponent } from '~api/componentTypes'

import pageStyles from '~components/Page/Page.module.css'

const Heading = ({
  children,
  level = 2,
  contentWidth = 'content'
}: HeadingComponent) => {
  const HTag = `h${level}` as keyof JSX.IntrinsicElements
  return <HTag className={pageStyles[contentWidth]}>{children}</HTag>
}

export default Heading
