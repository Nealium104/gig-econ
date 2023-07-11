/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary-100" : "#00ADB5",
        "primary-200" : "#AAE3E2",
        "primary-300" : "#fdf6fd",
        "accent-100" : "#AC7DD2",
        "accent-200" : "#fff4ff",
        "text-100" : "#EEEEEE",
        "text-200" : "#C5C5C5",
        "bg-100" : "#222831",
        "bg-200" : "#393E46",
        "bg-300" : "#454e59",        
      },
      borderWidth: {
        'nospinner': '0px'
      },
    },
  },
}