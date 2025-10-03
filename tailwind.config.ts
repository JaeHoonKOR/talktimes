import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neumorphic 색상 팔레트 (라이트/다크 모드 지원)
        neumorphic: {
          // 라이트 모드
          primary: '#E0E5EC',
          secondary: '#EBF0F7',
          elevated: '#F0F4FA',
          depressed: '#D1D9E6',
          'text-primary': '#303030',
          'text-secondary': '#5A5A5A',
          'text-muted': '#8A8A8A',
          'accent-primary': '#667EEA',
          'accent-secondary': '#764BA2',
          success: '#4ECDC4',
          warning: '#F7DC6F',
          error: '#FF6B6B',
          'shadow-light': '#FFFFFF',
          'shadow-dark': '#A3B1C6',
          
          // 다크 모드
          'dark-primary': '#2A2D35',
          'dark-secondary': '#1F2127',
          'dark-elevated': '#35393F',
          'dark-depressed': '#1C1E24',
          'dark-text-primary': '#E4E4E7',
          'dark-text-secondary': '#A1A1AA',
          'dark-text-muted': '#71717A',
          'dark-shadow-light': '#3A3E46',
          'dark-shadow-dark': '#0F1115',
        },
        
        // 카테고리별 색상 시스템
        category: {
          politics: { light: '#3B82F6', dark: '#60A5FA' },
          economy: { light: '#10B981', dark: '#34D399' },
          technology: { light: '#8B5CF6', dark: '#A78BFA' },
          sports: { light: '#EF4444', dark: '#F87171' },
          culture: { light: '#F59E0B', dark: '#FBBF24' },
          international: { light: '#6366F1', dark: '#818CF8' },
          health: { light: '#EC4899', dark: '#F472B6' },
          environment: { light: '#059669', dark: '#10B981' },
        },
      },
      boxShadow: {
        // 라이트 모드 Neumorphic 그림자
        'neuro-inset-sm': 'inset 2px 2px 5px #A3B1C6, inset -2px -2px 5px #FFFFFF',
        'neuro-inset': 'inset 3px 3px 7px #A3B1C6, inset -3px -3px 7px #FFFFFF',
        'neuro-outset-sm': '3px 3px 6px #A3B1C6, -3px -3px 6px #FFFFFF',
        'neuro-outset': '5px 5px 10px #A3B1C6, -5px -5px 10px #FFFFFF',
        'neuro-outset-md': '8px 8px 16px #A3B1C6, -8px -8px 16px #FFFFFF',
        'neuro-outset-lg': '12px 12px 24px #A3B1C6, -12px -12px 24px #FFFFFF',
        'neuro-floating': '0 4px 8px rgba(163, 177, 198, 0.3)',
        'neuro-focus': 'inset 3px 3px 7px #A3B1C6, inset -3px -3px 7px #FFFFFF, 0 0 0 2px #667EEA',
        'neuro-button-pressed': 'inset 3px 3px 7px #A3B1C6, inset -3px -3px 7px #FFFFFF',
        
        // 다크 모드 Neumorphic 그림자
        'neuro-dark-inset-sm': 'inset 2px 2px 5px #0F1115, inset -2px -2px 5px #3A3E46',
        'neuro-dark-inset': 'inset 3px 3px 7px #0F1115, inset -3px -3px 7px #3A3E46',
        'neuro-dark-outset-sm': '3px 3px 6px #0F1115, -3px -3px 6px #3A3E46',
        'neuro-dark-outset': '5px 5px 10px #0F1115, -5px -5px 10px #3A3E46',
        'neuro-dark-outset-md': '8px 8px 16px #0F1115, -8px -8px 16px #3A3E46',
        'neuro-dark-outset-lg': '12px 12px 24px #0F1115, -12px -12px 24px #3A3E46',
        'neuro-dark-floating': '0 4px 8px rgba(15, 17, 21, 0.5)',
        'neuro-dark-focus': 'inset 3px 3px 7px #0F1115, inset -3px -3px 7px #3A3E46, 0 0 0 2px #667EEA',
        'neuro-dark-button-pressed': 'inset 3px 3px 7px #0F1115, inset -3px -3px 7px #3A3E46',
      },
      borderRadius: {
        'neuro-sm': '8px',
        'neuro': '12px',
        'neuro-md': '16px',
        'neuro-lg': '20px',
        'neuro-xl': '24px',
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'neuro-xs': '0.75rem',
        'neuro-sm': '0.875rem',
        'neuro-base': '1rem',
        'neuro-lg': '1.125rem',
        'neuro-xl': '1.25rem',
        'neuro-2xl': '1.5rem',
        'neuro-3xl': '1.875rem',
        'neuro-4xl': '2.25rem',
        'neuro-5xl': '3rem',
      },
      animation: {
        'neuro-pulse': 'neuroPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neuro-bounce': 'neuroBounce 1s infinite',
        'neuro-float': 'neuroFloat 3s ease-in-out infinite',
      },
      keyframes: {
        neuroPulse: {
          '0%, 100%': {
            boxShadow: '5px 5px 10px #A3B1C6, -5px -5px 10px #FFFFFF',
          },
          '50%': {
            boxShadow: '8px 8px 16px #A3B1C6, -8px -8px 16px #FFFFFF',
          },
        },
        neuroBounce: {
          '0%, 100%': {
            transform: 'translateY(0px)',
            boxShadow: '5px 5px 10px #A3B1C6, -5px -5px 10px #FFFFFF',
          },
          '50%': {
            transform: 'translateY(-2px)',
            boxShadow: '3px 3px 6px #A3B1C6, -3px -3px 6px #FFFFFF',
          },
        },
        neuroFloat: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
      },
      transitionTimingFunction: {
        'neuro': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'neuro': '200ms',
        'neuro-slow': '300ms',
        'glass': '200ms',
        'glass-slow': '300ms',
      },
      
      // Glassmorphism 스타일 확장
      backdropBlur: {
        'glass-xs': '2px',
        'glass-sm': '4px',
        'glass': '8px',
        'glass-md': '12px',
        'glass-lg': '16px',
        'glass-xl': '20px',
        'glass-2xl': '24px',
        'glass-3xl': '40px',
      },
      
      backgroundColor: {
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-white-light': 'rgba(255, 255, 255, 0.15)',
        'glass-white-medium': 'rgba(255, 255, 255, 0.2)',
        'glass-white-strong': 'rgba(255, 255, 255, 0.25)',
        'glass-black': 'rgba(0, 0, 0, 0.1)',
        'glass-black-light': 'rgba(0, 0, 0, 0.15)',
        'glass-black-medium': 'rgba(0, 0, 0, 0.2)',
        'glass-black-strong': 'rgba(0, 0, 0, 0.25)',
      },
      
      borderColor: {
        'glass-border': 'rgba(255, 255, 255, 0.2)',
        'glass-border-light': 'rgba(255, 255, 255, 0.1)',
        'glass-border-strong': 'rgba(255, 255, 255, 0.3)',
        'glass-border-dark': 'rgba(0, 0, 0, 0.2)',
        'glass-border-dark-light': 'rgba(0, 0, 0, 0.1)',
        'glass-border-dark-strong': 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config