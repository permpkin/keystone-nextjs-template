export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(' ')

  return value
    .replace(/[^a-z0-9 -\/]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-')
}