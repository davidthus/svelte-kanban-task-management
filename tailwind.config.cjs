const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			'dark-body-bg': '#20212C',
			'dark-aside-bg': '#2B2C37',
			'dark-navbar-bg': '#2B2C37',
			'dark-task-bg': '#2B2C37',
			'dark-scroll-bg': '#2B2C37',
			'light-body-bg': '#E4EBFA',
			'light-navbar-bg': 'white',
			'light-aside-bg': 'white',
			'light-task-bg': 'white',
			'light-scroll-bg': 'white',

			// sub task checkbox
			'dark-sub-task-checkbox-bg': '#20212C',
			'dark-sub-task-checkbox-hover': '#635FC725',

			'dark-check-box-bg': '#2B2C37',
			'dark-completed-checkbox-bg': '#635FC7',
			'light-sub-task-checkbox-bg': '#F4F7FD',
			'light-sub-task-checkbox-hover': '#635FC725',

			'light-checkbox-bg': 'white',
			'light-completed-checkbox-bg': '#635FC7',
			// input field

			'light-text-field-error': '#EA5555',
			'dark-text-field-error': '#EA5555',
			// drop down
			'dark-drop-down-idle': '#828FA3',
			'dark-drop-down-border': '#828FA325',
			'dark-drop-down-active': '#635FC7',
			'dark-drop-down-bg': '#20212C',

			'light-dropdown-border': '#828FA325',
			'light-dropdown-active': '#635FC7',
			'light-dropdown-bg': 'white',
			'light-dropdown-idle': '#828FA3',

			// buttons
			'dark-button-primary-bg': '#635FC7',
			'dark-button-primary-hover': '#A8A4FF',
			'dark-button-primary-text': 'white',
			'dark-button-secondary-bg': 'white',
			'dark-button-secondary-text': '#635FC7',
			'dark-button-secondary-hover': 'rgba(255, 255, 255, 0.6)',
			'dark-delete-button-bg': '#EA5555',
			'dark-delete-button-text': 'white',
			'dark-delete-button-hover': '#FF9898',
			'dark-inactive-board-tab-hover': 'white',
			'light-button-primary-bg': '#635FC7',
			'light-button-primary-hover': '#A8A4FF',
			'light-button-primary-text': 'white',
			'light-button-secondary-bg': 'rgba(99, 95, 199, 0.1)',
			'light-button-secondary-text': '#635FC7',
			'light-button-secondary-hover': 'rgba(99, 95, 199, 0.25)',
			'light-delete-button-bg': '#EA5555',
			'light-delete-button-text': 'white',
			'light-delete-button-hover': '#FF9898',
			'light-inactive-board-tab-hover': '#97979730',
			// text

			'dark-text-primary': 'white',
			'light-text-primary': 'black',

			// shared

			border: '#3E3F4E',
			grey: '#828FA3',
			blue: '#635FC7',
			'light-blue': '#A8A4FF',
			red: '#EA5555',
			'normal-theme': 'black',
			'edit-drop-down': '#20212C'
		},
		extend: {}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.light-new-column': {
					background: 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)'
				},
				'.light-task-box-shadow': {
					'box-shadow': '0px 4px 6px rgba(54, 78, 126, 0.101545)'
				},
				'.dark-new-column': {
					background:
						'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)'
				},
				'.dark-task-box-shadow': {
					filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
				}
			});
		})
	]
};
