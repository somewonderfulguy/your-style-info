import { useIsDesktop } from '~contexts/screenDimensionsContext'

import styles from './TextBlock.module.css'

type Props = { text?: string }

const TextBlock = ({ text = '' }: Props) => {
  const isDesktop = useIsDesktop()
  return (
    <p className={isDesktop ? styles.textBlock : styles.textBlockMobile}>
      {text}
    </p>
  )
}

export default TextBlock
