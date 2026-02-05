module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spa: {
          50: '#f9f8f7',
          100: '#f3f1f0',
          200: '#e8e4e2',
          300: '#ddd7d4',
          400: '#c9bfba',
          500: '#b5a8a0',
          600: '#a39589',
          700: '#8f8278',
          800: '#7b7067',
          900: '#6b6157',
        },
        accent: {
          green: '#9ec8a8',
          pink: '#e8b4c8',
          cream: '#fef8f3',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
