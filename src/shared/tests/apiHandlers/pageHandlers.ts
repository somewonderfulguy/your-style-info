import { rest } from 'msw'

import { PageType } from '~api/pageApi'
import trenchCoatEn from '../../../../public/json/trench-coat-en.json'
import trenchCoatUa from '../../../../public/json/trench-coat-ua.json'

const baseUrl = 'http://localhost'

type errorType = { error: 'error' }

// TODO reduce boilerplate!
export const getPage = (options = { isOnce: false, isFail: false }) =>
  rest.get<undefined, PageType | errorType>(
    `${baseUrl}/json/:file`,
    async (req, res, ctx) => {
      const { file } = req.params

      let success: PageType
      switch (file) {
        case 'trench-coat-en.json':
          success = trenchCoatEn as PageType
          break
        case 'trench-coat-ua.json':
          success = trenchCoatUa as PageType
          break
        default:
          return res(ctx.status(500), ctx.json({ error: 'error' } as errorType))
      }

      const error: errorType = { error: 'error' }
      const response = options.isFail ? error : success
      const code = options.isFail ? 500 : 200

      return options.isOnce && file
        ? res.once(ctx.status(code), ctx.json(response))
        : res(ctx.status(code), ctx.json(response))
    }
  )

export const pageHandlers = [getPage()]
