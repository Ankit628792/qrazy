import type { Config } from 'tailwindcss'
import { QrazyTheme } from './src/providers/theme-provider/theme/index.ts'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      ...QrazyTheme.baseTheme,
      dark: {
        ...QrazyTheme.darkTheme
      }
    }
  },
  plugins: []
}
export default config
