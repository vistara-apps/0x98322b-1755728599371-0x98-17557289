
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210 90% 54%)',
        accent: 'hsl(290 80% 62%)',
        bg: 'hsl(240 12% 10%)',
        surface: 'hsl(240 6% 8%)',
        text: 'hsl(0 0% 95%)',
        muted: 'hsl(0 0% 70%)',
      },
      fontSize: {
        display: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.75rem' }],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(0, 0%, 0%, 0.12)',
        glass: '0 8px 32px hsla(0, 0%, 0%, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
