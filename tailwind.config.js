/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Light Blue and Dark Blue Theme
        primary: {
          50: '#eff6ff',   // Lightest blue
          100: '#dbeafe',  // Very light blue
          200: '#bfdbfe',  // Light blue
          300: '#93c5fd',  // Medium light blue
          400: '#60a5fa',  // Light blue (accent)
          500: '#3b82f6',  // Standard blue
          600: '#2563eb',  // Dark blue (primary)
          700: '#1d4ed8',  // Darker blue
          800: '#1e40af',  // Very dark blue
          900: '#1e3a8a',  // Darkest blue
        },
        accent: {
          light: '#60a5fa',   // Light blue accent
          DEFAULT: '#3b82f6', // Standard blue
          dark: '#2563eb',    // Dark blue accent
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(37, 99, 235, 0.08)',
        'medium': '0 4px 16px rgba(37, 99, 235, 0.12)',
        'large': '0 8px 24px rgba(37, 99, 235, 0.16)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.4s ease-out',
        'slideIn': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
