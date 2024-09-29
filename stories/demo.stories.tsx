import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

type TextProps = {
  children: React.ReactNode
}

const Text = ({ children }: TextProps) => <p>{children}</p>

const meta: Meta<typeof Text> = {
  title: 'demo/text',
  component: Text
}

type Story = StoryObj<typeof Text>
export default meta

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const DefaultText: Story = {
  args: {
    children: 'Hello World!!'
  }
}
