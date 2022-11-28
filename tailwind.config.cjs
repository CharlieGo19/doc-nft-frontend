const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'light-mode-mint': '#A0EFE9',
        'mint-edge': '#33B3A6',
      },
      flexGrow: {
        '2': 2
      },
      minWidth: {
        '73': '300px',
      },
      fontFamily: {
        'material-symbols-outlined': ['"Material Symbols Outlined"'],
        'orbitron': ['"Orbitron"'],
        'Poppins': ['"Poppins"'],
      }
    },
  },

  plugins: [],
};

module.exports = config;
