export const isIpad = () => {
  const ua = window.navigator.userAgent

  if(ua.indexOf('iPad') > -1) return true

  if(ua.indexOf('Macintosh') > -1) {
    try {
      document.createEvent("TouchEvent")
      return true
    } catch (e) {}
  }

  return false
}