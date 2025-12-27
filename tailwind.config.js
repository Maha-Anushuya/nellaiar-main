/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // === FIX 1: GLOBAL CENTERING ===
    // This tells Tailwind: "Every time I use class 'container', make it centered"
    container: {
      center: true,        // <--- This fixes the "Left Alignment" issue
      padding: '1rem',     // Adds nice space on mobile phones
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      // === FIX 2: YOUR COLORS ===
      // Now you can use className="text-neon-aqua" or "bg-electric-purple"
      colors: {
        'electric-purple': '#8A2BE2',
        'neon-aqua': '#00AFFF',
        'neon-cyan': '#00FFF5',
        'gold': '#FFD700',
        'dark-base': '#0A0A1A',
      },
      // === FIX 3: ANIMATIONS ===
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}