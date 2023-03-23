const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			darkBodyBg: '#20212C',
			darkAsideBg: '#2B2C37',
			darkNavbarBg: '#2B2C37',
			darkTaskBg: '#2B2C37',
			darkScrollBg: '#2B2C37',
			lightBodyBg: '#E4EBFA',
			lightNavbarBg: 'white',
			lightAsideBg: 'white',
			lightTaskBg: 'white',
			lightScrollBg: 'white',

			// sub task checkbox
			darkSubtaskCheckboxBg: '#20212C',
			darkSubtaskCheckboxHover: '#635FC725',
			lightSubtaskCheckboxBg: '#F4F7FD',
			lightSubtaskCheckboxHover: '#635FC725',

			darkCheckboxBg: '#2B2C37',
			darkCompletedCheckboxBg: '#635FC7',
			lightCheckboxBg: 'white',
			lightCompletedCheckboxBg: '#635FC7',
			// input field

			lightTextFieldError: '#EA5555',
			darkTextFieldError: '#EA5555',
			// drop down
			darkDrodownBorder: '#828FA325',
			darkDropdownActive: '#635FC7',
			darkDropdownBg: '#20212C',
			darkDropdownIdle: '#828FA3',

			lightDrodownBorder: '#828FA325',
			lightDropdownActive: '#635FC7',
			lightDropdownBg: 'white',
			lightDropdownIdle: '#828FA3',

			// buttons
			darkButtonPrimaryBg: '#635FC7',
			darkButtonPrimaryHover: '#A8A4FF',
			darkButtonPrimaryText: 'white',
			darkButtonSecondaryBg: 'white',
			darkButtonSecondaryText: '#635FC7',
			darkButtonSecondaryHover: 'rgba(255, 255, 255, 0.6)',
			darkButtonDeleteBg: '#EA5555',
			darkButtonDeleteText: 'white',
			darkButtonDeleteHover: '#FF9898',
			darkInactiveBoardTabHover: 'white',
			lightButtonPrimaryBg: '#635FC7',
			lightButtonPrimaryHover: '#A8A4FF',
			lightButtonPrimaryText: 'white',
			lightButtonSecondaryBg: 'rgba(99, 95, 199, 0.1)',
			lightButtonSecondaryText: '#635FC7',
			lightButtonSecondaryHover: 'rgba(99, 95, 199, 0.25)',
			lightButtonDeleteBg: '#EA5555',
			lightButtonDeleteText: 'white',
			lightButtonDeleteHover: '#FF9898',
			lightInactiveBoardTabHover: '#97979730',
			// text

			darkTextPrimary: 'white',
			lightTextPrimary: 'black',

			// shared

			border: '#3E3F4E',
			grey: '#828FA3',
			purple: '#635FC7',
			lightBlue: '#A8A4FF',
			red: '#EA5555',
			white: "#FFFFFF",
			normalTheme: 'black',
			EditDropDown: '#20212C'
		},
		extend: {}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.lightNewColumn': {
					background: 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)'
				},
				'.lightTaskBoxShadow': {
					'box-shadow': '0px 4px 6px rgba(54, 78, 126, 0.101545)'
				},
				'.darkNewColumn': {
					background:
						'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)'
				},
				'.darkTaskBoxShadow': {
					filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
				},
				'.addTaskXPadding': {
					'padding-inline': 'clamp(1.5rem, 3vw, 2.5rem)'
				},
				'.headingxl': {
					'font-weight': 'bold',
					'font-size': '24px',
					'line-height': '30px'
				},
				'.headingl': {
					'font-weight': 'bold',
					'font-size': '18px',
					'line-height': '23px'
				},
				'.headingm': {
					'font-weight': 'bold',
					'font-size': '15px',
					'line-height': '19px'
				},
				'.headings': {
					'font-weight': 'bold',
					'font-size': '12px',
					'line-height': '15px',
					'letter-spacing': '2.4px'
				},
				'.bodyl': {
					'font-weight': 500,
					'font-size': '13px',
					'line-height': '23px'
				},
				'.bodym': {
					'font-weight': 'bold',
					'font-size': '12px',
					'line-height': '15px'
				},
				'.buttonstext': {
					'font-weight': 'bold',
					'font-size': '13px',
					'line-height': '23px'
				}
			});
		})
	]
};
