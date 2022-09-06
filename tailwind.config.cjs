/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/*.{js,jsx,ts,tsx}', './src/components/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 5s ease-in-out',
      },

      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
      }),
    },
  },
  plugins: [],
};
