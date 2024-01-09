export const LANGUAGES = new Map([
  ['en', 'English'],
  ['ua', 'Українська']
])

export const LOCALE_STRINGS = new Map<'en' | 'ua', string>([
  ['en', 'en-UK'],
  ['ua', 'uk-UA']
])

export const LOCALES = Array.from(LANGUAGES.keys())

export const FULL_LOCALES = Array.from(LANGUAGES.values())
