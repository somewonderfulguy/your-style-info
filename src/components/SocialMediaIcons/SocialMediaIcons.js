import React from 'react'

import {FacebookIcon, InstagramIcon, VKontakteIcon, YouTubeIcon, TwitterIcon} from '../../assets/images'
import styles from './SocialMediaIcons.module.css'

const SocialMediaIcons = () => (
  <div className={styles.layout}>
    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
      <InstagramIcon fill="#919191" />
    </a>
    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
      <FacebookIcon fill="#919191" />
    </a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
      <TwitterIcon fill="#919191" />
    </a>
    <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
      <VKontakteIcon fill="#919191" />
    </a>
    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
      <YouTubeIcon fill="#919191" />
    </a>
  </div>
)

export default SocialMediaIcons