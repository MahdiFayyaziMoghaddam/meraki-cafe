/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				bark: {
					950: "hsl(var(--bark-950))",
					900: "hsl(var(--bark-900))",
					800: "hsl(var(--bark-800))",
					700: "hsl(var(--bark-700))",
					600: "hsl(var(--bark-600))",
					500: "hsl(var(--bark-500))"
				},
				coffee: {
					400: "hsl(var(--coffee-400))",
					500: "hsl(var(--coffee-500))",
					600: "hsl(var(--coffee-600))",
					700: "hsl(var(--coffee-700))"
				},
				cream: {
					50: "hsl(var(--cream-50))",
					100: "hsl(var(--cream-100))",
					200: "hsl(var(--cream-200))",
					300: "hsl(var(--cream-300))",
					400: "hsl(var(--cream-400))"
				},
				ink: {
					950: "hsl(var(--ink-950))",
					900: "hsl(var(--ink-900))"
				},
				success: "hsl(var(--success))",
				warning: "hsl(var(--warning))",
				danger: "hsl(var(--danger))",
				info: "hsl(var(--info))",
				chart: {
					1: "hsl(var(--coffee-500))",
					2: "hsl(var(--cream-300))",
					3: "hsl(var(--success))",
					4: "hsl(var(--warning))",
					5: "hsl(var(--danger))"
				}
			},
			fontFamily: {
				heading: ["var(--font-heading)"],
				body: ["var(--font-body)"],
				display: ["var(--font-display)"],
				mono: ["var(--font-mono)"]
			},
			boxShadow: {
				sm: "0 1px 2px rgba(0,0,0,0.4)",
				md: "0 4px 12px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.4)",
				glow: "0 0 0 1px rgba(156,104,66,0.35), 0 0 24px -8px rgba(156,104,66,0.45)"
			},
			keyframes: {
				"accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
				"accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } }
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out"
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
};
