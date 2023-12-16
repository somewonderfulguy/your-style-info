type Props = { text?: string }

const TextBlock = ({ text = '' }: Props) => <p>{text}</p>

export default TextBlock
