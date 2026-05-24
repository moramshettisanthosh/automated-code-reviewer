export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3F4EFC',
        accent: '#1DD4FF',
        surface: '#111827',
        panel: 'rgba(15, 23, 42, 0.85)',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(63,78,252,0.2)',
      },
    },
  },
  plugins: [],
};
