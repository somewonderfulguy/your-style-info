import { rest } from 'msw'

import { localeTranslationsType } from 'api'
import enJson from '../../../../public/locales/en.json'
import ruJson from '../../../../public/locales/ru.json'

const baseUrl = 'http://localhost'

type errorType = { error: 'error' }

// TODO reduce boilerplate!
export const getLocaleTranslations = (
  options = { isOnce: false, isFail: false }
) =>
  rest.get<undefined, localeTranslationsType | errorType>(
    `${baseUrl}/locales/:json`,
    async (req, res, ctx) => {
      const { json } = req.params

      let success: localeTranslationsType
      switch (json) {
        case 'en.json':
          success = enJson
          break
        case 'ru.json':
          success = ruJson
          break
        default:
          return res(ctx.status(500), ctx.json({ error: 'error' } as errorType))
      }

      const error: errorType = { error: 'error' }
      const response = options.isFail ? error : success
      const code = options.isFail ? 500 : 200

      return options.isOnce && json
        ? res.once(ctx.status(code), ctx.json(response))
        : res(ctx.status(code), ctx.json(response))
    }
  )

export const localeHandlers = [getLocaleTranslations()]
