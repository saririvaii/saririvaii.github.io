import fluid, { extract, fontSize } from "fluid-tailwind";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main color palette
        'black-main': '#1A1A1A',
        'white-main': '#F5F5F5',
        'accent-primary': '#484C18',
        // Legacy support
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-garamond)', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      screens: {
        xs: "18.75rem", // 300px
        sm: "30rem", // 480px
        md: "48rem", // 768px
        lg: "62rem", // 960px
        xl: "90rem", // 1440px
        "2xl": "120rem", //1920px
      },
    },
  },
  plugins: [
    fluid(),
    require('@tailwindcss/typography'),
  ],
}
