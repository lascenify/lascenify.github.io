/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
        surface: {
          light: '#F3F4F6',
          dark: '#374151',
        },
        text: {
          primary: {
            light: '#111827',
            dark: '#F9FAFB',
          },
          secondary: {
            light: '#6B7280',
            dark: '#D1D5DB',
          },
        },
      },
    },
  },
  plugins: [],
}
