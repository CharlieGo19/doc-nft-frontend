/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"shallow-light-mint": "#82FFF2",
				"light-mint": "#33B3A6",
				"dark-mint": "#137A63",
				"deep-dark-mint": "#0A3A2A",
			},
			flexGrow: {
				2: 2,
			},
			minWidth: {
				73: "300px",
			},
			fontFamily: {
				"material-symbols-outlined": ['"Material Symbols Outlined"'],
				orbitron: ['"Orbitron"'],
				Poppins: ['"Poppins"'],
			},
			boxShadow: {
				toast: "0 -4px 22px 1px",
			},
			backgroundImage: {
				"homepage-ad-1": "url('/ads/main_page_headline_ad.png')",
			},
		},
	},
	plugins: [
		// plugin(function ({ addUtilities }) {
		// 	addUtilities({
		// 		".no-scrollbar::-webkit-scrollbar": {
		// 			display: "none",
		// 		},
		// 	});
		// }),
	],
};
