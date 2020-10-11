import React from 'react'

import {useScreenDimensions} from 'contexts'
import {isIpad} from 'shared/utils'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

export const BOUNDARY = 1024

const Header = () => {
  const {isDesktop} = useScreenDimensions()

  return (isDesktop && !isIpad())
    ? <HeaderDesktop />
    : <HeaderMobile />
}

export default Header