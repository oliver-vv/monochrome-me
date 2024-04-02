import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans],
				blockquote: 'var(--blockquote-font-family)',
				body: 'var(--body-font-family)',
				'body-medium': 'var(--body-medium-font-family)',
				'body-semi-bold': 'var(--body-semi-bold-font-family)',
				detail: 'var(--detail-font-family)',
				'h-1': 'var(--h-1-font-family)',
				'h-2': 'var(--h-2-font-family)',
				'h-3': 'var(--h-3-font-family)',
				'h-4': 'var(--h-4-font-family)',
				'hero-heading': 'var(--hero-heading-font-family)',
				'inline-code': 'var(--inline-code-font-family)',
				large: 'var(--large-font-family)',
				lead: 'var(--lead-font-family)',
				list: 'var(--list-font-family)',
				p: 'var(--p-font-family)',
				'p-ui': 'var(--p-ui-font-family)',
				'p-ui-medium': 'var(--p-ui-medium-font-family)',
				small: 'var(--small-font-family)',
				'suble-semibold': 'var(--suble-semibold-font-family)',
				subtle: 'var(--subtle-font-family)',
				'subtle-medium': 'var(--subtle-medium-font-family)',
				'table-head': 'var(--table-head-font-family)',
				'table-item': 'var(--table-item-font-family)'
			}
		}
	}
};

export default config;
