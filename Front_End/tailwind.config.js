/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      backgroundImage: {
        'student-image': "url('/path-to-your-image.jpg')",
      },
    },
  },
  variants: {
    extend: {
      backgroundAttachment: ['responsive', 'hover', 'focus'],
    },
  },
  
  plugins: [],
}


