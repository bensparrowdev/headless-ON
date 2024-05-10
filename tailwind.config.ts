import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      oswald: ['Oswald', 'system-ui', 'sans-serif'],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        grey: '#f1f1f1',
        redAccent: '#E2373E',
        greenAccent: '#157F1F',
      },
    },
  },
  plugins: [],
} satisfies Config;
