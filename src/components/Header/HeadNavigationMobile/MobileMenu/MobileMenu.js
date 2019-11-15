import React from 'react'
import {bool} from 'prop-types'

const propTypes = {isOpen: bool}
const defaultProps = {isOpen: false}

const MobileMenu = ({isOpen}) => (
  <div></div>
)

MobileMenu.propTypes = propTypes
MobileMenu.defaultProps = defaultProps

export default MobileMenu