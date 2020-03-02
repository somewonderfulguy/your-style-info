import React, {useContext} from 'react'

import {ScreenWidthContext} from 'ApplicationNode'
import {isIpad} from 'utils'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

export const BOUNDARY = 1024

const Header = () => {
  const isDesktop = useContext(ScreenWidthContext) > BOUNDARY

  return (isDesktop && !isIpad())
    ? <HeaderDesktop />
    : <HeaderMobile />
}

export default Header