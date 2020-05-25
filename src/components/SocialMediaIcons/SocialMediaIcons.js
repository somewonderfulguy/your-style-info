import React from 'react'
import {bool, oneOf} from 'prop-types'

import {FacebookIcon, InstagramIcon, VKontakteIcon, YouTubeIcon, TwitterIcon} from 'assets/images'
import styles from './SocialMediaIcons.module.css'

const propTypes = {
  small: bool,
  color: oneOf(['lightgray', 'darkgray'])
}

const defaultProps = {
  small: false,
  color: 'darkgray'
}

const SMALL_SIZES = new Map([
  ['instagram', {width: 18.9, height: 18.9}],
  ['facebook', {width: 17.5, height: 18.2}],
  ['twitter', {width: 20.3, height: 16.8}],
  ['vk', {width: 17.5, height: 17.5}],
  ['youTube', {width: 22.4, height: 15.4}]
])

const COLORS = new Map([
  ['lightgray', '#919191'],
  ['darkgray', '#636363']
])

const SocialMediaIcons = ({small, color}) => {
  const targetBlank = {rel: 'noopener noreferrer', target: '_blank'}

  const getStyles = type => ({
    ...(small ? SMALL_SIZES.get(type) : {}),
    fill: COLORS.get(color)
  })

  return (
    <div className={small ? styles.layoutSmall : styles.layout}>
      <a href="https://instagram.com/" title="Instagram" {...targetBlank}>
        <InstagramIcon style={getStyles('instagram')} />
      </a>
      <a href="https://www.facebook.com/" style={{marginTop: -2}} title="Facebook" {...targetBlank}>
        <FacebookIcon style={getStyles('facebook')} />
      </a>
      <a href="https://twitter.com/" style={{marginTop: -1}} title="Twitter" {...targetBlank}>
        <TwitterIcon style={getStyles('twitter')} />
      </a>
      <a href="https://vk.com/" title="VKontakte" {...targetBlank}>
        <VKontakteIcon style={getStyles('vk')} />
      </a>
      <a href="https://www.youtube.com/" title="YouTube" {...targetBlank}>
        <YouTubeIcon style={getStyles('youTube')} />
      </a>
    </div>
  )
}

SocialMediaIcons.propTypes = propTypes
SocialMediaIcons.defaultProps = defaultProps

export default SocialMediaIcons