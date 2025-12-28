/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                muted: 'var(--muted)',
                accent: 'var(--accent)',
                destructive: 'var(--destructive)',
                border: 'var(--border)',
                ring: 'var(--ring)',
            },
            borderRadius: {
                base: 'var(--radius)',
            },
            fontFamily: {
                mono: 'var(--font-mono), monospace',
            },
            ringWidth: {
                DEFAULT: '2px', // optional
            },
        },
    },
    plugins: [
        function ({ addUtilities, theme }) {
            const newUtilities = {
                '.border-border': { borderColor: theme('colors.border') },
                '.outline-ring': { outlineColor: theme('colors.ring') },
            }
            addUtilities(newUtilities, ['responsive', 'hover'])
        },
    ],
}
