/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                background: '#020617', // Deepest slate for 3D contrast
                surface: '#0f172a',
                'surface-glass': 'rgba(15, 23, 42, 0.7)',
                primary: {
                    DEFAULT: '#06b6d4', // Cyan
                    glow: 'rgba(6, 182, 212, 0.5)'
                },
                accent: {
                    cyan: '#22d3ee',
                    purple: '#a855f7',
                    emerald: '#10b981',
                    amber: '#f59e0b',
                    rose: '#e11d48'
                }
            },
            animation: {
                'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-slower': 'pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 3s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'bounce-3d': 'bounce3d 2s infinite ease-in-out',
                'spin-slow': 'spin 30s linear infinite',
            },
            keyframes: {
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)' },
                    '100%': { boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                bounce3d: {
                    '0%, 100%': { transform: 'translateZ(20px)' },
                    '50%': { transform: 'translateZ(40px)' }
                }
            },
            boxShadow: {
                'glow-primary': '0 0 20px -5px rgba(6, 182, 212, 0.5)',
                'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.5)',
                'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.6)',
                'glow-rose': '0 0 20px -5px rgba(225, 29, 72, 0.5)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                '3d-base': '0px 20px 40px -10px rgba(0,0,0,0.8), inset 0px -2px 10px rgba(255,255,255,0.1)',
            }
        },
    },
    plugins: [],
}
