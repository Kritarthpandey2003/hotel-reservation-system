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
            },
            colors: {
                background: '#eef2f6', // Light grayish blue background
                surface: '#ffffff', // White panels
                primary: '#4281a4', // Blue-slate button color
                text: {
                    main: '#334155', // Slate 700
                    muted: '#64748b' // Slate 500
                },
                status: {
                    available: '#96d2b5', // Soft Green
                    occupied: '#f28e8e',  // Soft Red
                    cleaning: '#fce277',  // Yellow
                    maintenance: '#8bb8e8', // Light Blue
                    checkout: '#c4b5fd'   // Purple
                },
                sidebar: '#f8fafc',
                border: '#e2e8f0'
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
