import React from 'react'
import {useTranslation} from 'react-i18next'

import {LANGUAGES} from '../../constants/languages'

const LangSelector = () => {
  const [, i18n] = useTranslation('', {useSuspense: false})

  const changeLang = lng => i18n.changeLanguage(lng)

  return (
    [...LANGUAGES.keys()].map((lang, i, arr) => (
      (i18n.language !== lang) ? (
        <button key={lang} onClick={() => changeLang(lang)}>
          {LANGUAGES.get(lang)}
        </button>
      ) : null
    ))
  )
}

export default LangSelector