/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // byYOUFORM Luxury Black & Gold Theme
        luxury: {
          black: '#000000',
          charcoal: '#111111',
          gold: '#D4AF37',
          champagne: '#E6C87A',
          cream: '#F5F2EB',
        },

        // Primary color mappings
        primary: {
          50: '#FBF8F1',
          100: '#F7F1E3',
          200: '#EBDCB9',
          300: '#DFC790',
          400: '#D4AF37',
          500: '#B89628',
          600: '#A08020',
          700: '#806018',
          800: '#604812',
          900: '#40300C',
        },

        // Gold accent scale
        gold: {
          50: '#FBF8F1',
          100: '#F7F1E3',
          200: '#EBDCB9',
          300: '#E6C87A',  // Champagne
          400: '#D4AF37',  // Metallic Gold
          500: '#B89628',
          600: '#A08020',
          700: '#806018',
          800: '#604812',
          900: '#40300C',
        },

        // Navy scale for admin dashboard (light theme)
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },

        // Theme mappings for compatibility
        'theme-bg': '#000000',
        'theme-text': '#F5F2EB',
        'theme-accent': '#D4AF37',
        'theme-secondary': '#111111',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(212, 175, 55, 0.05)',
        'medium': '0 4px 15px rgba(212, 175, 55, 0.1)',
        'hover': '0 8px 25px rgba(212, 175, 55, 0.15)',
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E6C87A 50%, #D4AF37 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
