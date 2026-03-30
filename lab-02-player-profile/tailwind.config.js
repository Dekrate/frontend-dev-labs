module.exports = {
  content: ['./src/**/*.{html,js}', './*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        padel: '#10b981',
        'padel-light': '#34d399',
        'padel-dark': '#059669',
        'padel-secondary': '#6366f1',
        'padel-gold': '#fbbf24',
        'padel-blue': '#60a5fa',
      },
      spacing: {
        '2.6': '2.6rem',
        '17.3': '17.3rem',
      },
      boxShadow: {
        'padel': '0 4px 14px 0 rgba(16, 185, 129, 0.4)',
        'padel-lg': '0 10px 25px 0 rgba(16, 185, 129, 0.5)',
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-once': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1',
        'bounce-slow': 'bounce 1s infinite 0.5s',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      screens: {
        'padel-sm': '480px',
      },
      ringWidth: {
        '2.5': '2.5px',
      },
    },
  },
  plugins: [
    function ({ addUtilities, addBase, theme }) {
      addBase({
        '.scroll-smooth': { scrollBehavior: 'smooth' },
      });
      addUtilities({
        '.bg-gradient-padel': {
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #059669 100%)',
        },
        '.text-gradient-padel': {
          background: 'linear-gradient(135deg, #10b981, #6366f1)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.border-gradient-padel': {
          borderImage: 'linear-gradient(135deg, #10b981, #6366f1) 1',
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
        '.animate-delay-100': { animationDelay: '100ms' },
        '.animate-delay-200': { animationDelay: '200ms' },
        '.animate-delay-300': { animationDelay: '300ms' },
        '.animate-delay-400': { animationDelay: '400ms' },
        '.animate-delay-500': { animationDelay: '500ms' },
      });
    },
  ],
};
