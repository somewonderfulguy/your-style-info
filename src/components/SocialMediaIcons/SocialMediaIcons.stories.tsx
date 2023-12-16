import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SocialMediaIcons from './SocialMediaIcons'

const componentMeta: ComponentMeta<typeof SocialMediaIcons> = {
  title: 'SocialMediaIcons',
  component: SocialMediaIcons
}
export default componentMeta

const Template: ComponentStory<typeof SocialMediaIcons> = (args) => (
  <SocialMediaIcons {...args} />
)

export const SocialMediaIconsDefault = Template.bind({})

SocialMediaIconsDefault.args = {}
