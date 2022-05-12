export const capitilizeFirstChar = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const getCorrectUrl = (url: string) => {
  if (url === '') {
    return '/'
  }

  if (url.startsWith('/')) {
    return url
  }

  return '/' + url
}
