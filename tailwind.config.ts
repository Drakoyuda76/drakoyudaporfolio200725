import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'tomorrow': ['Tomorrow', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Premium Earth Tone Palette
				forest: {
					50: 'hsl(var(--forest-50))',
					500: 'hsl(var(--forest-500))',
					600: 'hsl(var(--forest-600))',
					700: 'hsl(var(--forest-700))',
				},
				earth: {
					50: 'hsl(var(--earth-50))',
					400: 'hsl(var(--earth-400))',
					500: 'hsl(var(--earth-500))',
					600: 'hsl(var(--earth-600))',
				},
				crimson: {
					500: 'hsl(var(--crimson-500))',
					600: 'hsl(var(--crimson-600))',
				},
				stone: {
					50: 'hsl(var(--stone-50))',
					100: 'hsl(var(--stone-100))',
					400: 'hsl(var(--stone-400))',
					600: 'hsl(var(--stone-600))',
					800: 'hsl(var(--stone-800))',
				},
				// Status colors para badges das soluções
				status: {
					teste: 'hsl(var(--status-teste))',
					prototipo: 'hsl(var(--status-prototipo))',
					parceria: 'hsl(var(--status-parceria))',
					live: 'hsl(var(--status-live))',
					conceito: 'hsl(var(--status-conceito))',
					usuarios: 'hsl(var(--status-teste-usuarios))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-impact': 'var(--gradient-impact)',
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'hover': 'var(--shadow-hover)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'counter': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						transform: 'scale(1)',
						boxShadow: '0 0 20px hsl(var(--accent) / 0.3)'
					},
					'50%': { 
						transform: 'scale(1.02)',
						boxShadow: '0 0 30px hsl(var(--accent) / 0.5)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'counter': 'counter 0.6s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
