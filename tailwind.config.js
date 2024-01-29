/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue, js,ts,jsx,tsx}'],

  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      cs: '850px',
      lg: '960px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      padding: {
        DEFAULT: '10px',
        sm: '10px',
        lg: '12px',
        xl: '14px',
        '2xl': '15px',
      },
    },
  },
  screens: {},

  plugins: [require('tailwind-scrollbar')],
}
