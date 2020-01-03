import React, {useContext} from 'react'

import {ScreenWidthContext} from '../../ApplicationNode'
import {isIpad} from '../../utils'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

const Header = () => {
  const isDesktop = useContext(ScreenWidthContext) > 1024

  return (isDesktop && !isIpad())
    ? <HeaderDesktop />
    : <HeaderMobile />
}

export default Header