import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import TextBlock from './TextBlock'

const componentMeta: ComponentMeta<typeof TextBlock> = {
  title: 'TextBlock',
  component: TextBlock
}
export default componentMeta

const Template: ComponentStory<typeof TextBlock> = (args) => <TextBlock {...args} />

export const TextBlockDefault = Template.bind({})

TextBlockDefault.args = {
  text: 'Evil is Evil. Lesser, greater, middling… Makes no difference. The degree is arbitrary. The definition\'s blurred. If I\'m to choose between one evil and another… I\'d rather not choose at all.'
}