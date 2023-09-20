import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor : {
        'calculator-btn-1' : '#837D7D',
        'calculator-btn-2' : '#6B6262',
        'calculator-btn-3' : '#FFA00A',
        'calculator-display' : '#585152'
      }
    },
  },
  plugins: [],
}
export default config
