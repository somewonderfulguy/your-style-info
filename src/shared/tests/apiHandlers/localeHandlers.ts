import { rest } from 'msw'

import { LocaleTranslationsType } from 'api'
import enJson from '../../../../public/locales/en.json'
import uaJson from '../../../../public/locales/ua.json'

const baseUrl = 'http://localhost'

type errorType = { error: 'error' }

// TODO reduce boilerplate!
export const getLocaleTranslations = (
  options = { isOnce: false, isFail: false }
) =>
  rest.get<undefined, LocaleTranslationsType | errorType>(
    `${baseUrl}/locales/:json`,
    async (req, res, ctx) => {
      const { json } = req.params

      let success: LocaleTranslationsType
      switch (json) {
        case 'en.json':
          success = enJson
          break
        case 'ua.json':
          success = uaJson
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
