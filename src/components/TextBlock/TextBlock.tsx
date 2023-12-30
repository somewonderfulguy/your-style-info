import { useIsDesktop } from '~contexts/screenDimensionsContext'
import { TextComponent } from '~api/componentTypes'

import styles from './TextBlock.module.css'

const TextBlock = ({ children = '' }: TextComponent) => {
  const isDesktop = useIsDesktop()
  return (
    <p className={isDesktop ? styles.textBlock : styles.textBlockMobile}>
      {children}
    </p>
  )
}

export default TextBlock
