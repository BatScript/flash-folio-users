/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './portfolio-templates/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1'
      },
      spacing: {
        28: '7rem'
      },
      letterSpacing: {
        tighter: '-.04em'
      },
      width: {
        90: '90%'
        // Add more custom width values if needed
      },
      screens: {
        'tw-sm': '640px',
        // => @media (min-width: 640px) { ... }

        'tw-md': '768px',
        // => @media (min-width: 768px) { ... }

        'tw-lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'tw-xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        'tw-2xl': '1536px'
        // => @media (min-width: 1536px) { ... }
      },
      lineHeight: {
        tight: 1.2
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem'
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: [],
  prefix: 'tw-'
}
