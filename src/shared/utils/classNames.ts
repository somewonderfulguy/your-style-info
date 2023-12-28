const classNames = (...args: unknown[]) =>
  args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()

export default classNames
