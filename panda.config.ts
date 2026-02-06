import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				fonts: {
					orbitron: { value: '"Orbitron", sans-serif' },
				},
				colors: {
					background: { value: "oklch(0.145 0 0)" },
					foreground: { value: "oklch(0.985 0 0)" },
					card: { value: "oklch(0.205 0 0)" },
					"card-foreground": { value: "oklch(0.985 0 0)" },
					popover: { value: "oklch(0.205 0 0)" },
					"popover-foreground": { value: "oklch(0.985 0 0)" },
					primary: { value: "oklch(0.922 0 0)" },
					"primary-foreground": { value: "oklch(0.205 0 0)" },
					secondary: { value: "oklch(0.269 0 0)" },
					"secondary-foreground": { value: "oklch(0.985 0 0)" },
					muted: { value: "oklch(0.269 0 0)" },
					"muted-foreground": { value: "oklch(0.708 0 0)" },
					accent: { value: "oklch(0.269 0 0)" },
					"accent-foreground": { value: "oklch(0.985 0 0)" },
					border: { value: "oklch(1 0 0 / 10%)" },
					input: { value: "oklch(1 0 0 / 15%)" },
					ring: { value: "oklch(0.556 0 0)" },
					lamp: { value: "oklch(0.75 0.12 110)" },
					"lamp-dim": { value: "oklch(0.35 0.06 110)" },
				},
				radii: {
					radius: { value: "0.625rem" },
				},
			},
		},
	},

	// The output directory for your css system
	outdir: "styled-system",
});
