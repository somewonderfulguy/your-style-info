import React, {useContext} from 'react'

import {ScreenWidthContext} from '../../ApplicationNode'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

const Header = () => {
  const isDesktop = useContext(ScreenWidthContext) > 1024

  return isDesktop
    ? <HeaderDesktop />
    : <HeaderMobile />
}

export default Header