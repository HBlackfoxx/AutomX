/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			// Design System Colors
  			absolute: {
  				white: '#FFFFFF',
  				black: '#000000'
  			},
  			grey: {
  				'06': '#0F0F0F',
  				'10': '#1A1A1A',
  				'12': '#1F1F1F',
  				'15': '#262626',
  				'20': '#333333',
  				'25': '#404040',
  				'30': '#4C4C4C',
  				'40': '#666666'
  			},
  			white: {
  				'50': '#808080',
  				'55': '#8C8C8C',
  				'60': '#999999',
  				'65': '#A6A6A6',
  				'70': '#B3B3B3',
  				'75': '#BFBFBF',
  				'80': '#CCCCCC',
  				'90': '#E6E6E6'
  			},
  			blue: {
  				accent: '#06B6D4', // Neon blue for hover states
  				glow: 'rgba(6, 182, 212, 0.5)'
  			},
  			// Legacy support
  			dark: {
  				bg: '#0A0A0A',
  				'bg-secondary': '#1A1A1A',
  				text: '#FFFFFF',
  				'text-muted': '#E5E5E5'
  			},
  			light: {
  				bg: '#FFFFFF',
  				'bg-secondary': '#F5F5F5',
  				text: '#0A0A0A',
  				'text-muted': '#4A4A4A'
  			},
  			accent: {
  				blue: '#06B6D4',
  				'blue-hover': '#22D3EE'
  			},
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
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderColor: {
  			DEFAULT: 'hsl(var(--border))'
  		},
  		fontFamily: {
  			sans: [
  				'JetBrains Mono Variable',
  				'monospace'
  			],
  			mono: [
  				'JetBrains Mono Variable',
  				'monospace'
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem'
  		},
  		maxWidth: {
  			container: '1440px'
  		},
  		screens: {
  			mobile: '390px',
  			laptop: '1440px',
  			desktop: '1920px'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
