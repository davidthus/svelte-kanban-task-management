<script>
	import { BUTTONTYPES } from '../constants/buttonTypes';
	export let config;

	const baseButtonStyles =
		'rounded-full border-0 cursor-pointer flex justify-center items-center py-2 px-12';
	let specificButtonStyles;

	switch (config.buttonType) {
		case BUTTONTYPES.PRIMARYL:
			specificButtonStyles =
				'text-lightButtonPrimaryBg bg-lightButtonPrimaryBg py-[0.9rem] px-12 headingm hover:lightButtonPrimaryHover dark:text-darkButtonPrimaryBg dark:bg-darkButtonPrimaryBg dark:hover:darkButtonPrimaryHover';
			break;
		case BUTTONTYPES.PRIMARYS:
			specificButtonStyles =
				'text-lightButtonPrimaryBg bg-lightButtonPrimaryBg buttonstext hover:lightButtonPrimaryHover dark:text-darkButtonPrimaryBg dark:bg-darkButtonPrimaryBg dark:hover:darkButtonPrimaryHover';
			break;
		case BUTTONTYPES.SECONDARY:
			specificButtonStyles =
				'text-lightButtonSecondaryBg bg-lightButtonSecondaryBg buttonstext hover:lightButtonSecondaryHover dark:text-darkButtonSecondaryBg dark:bg-darkButtonSecondaryBg dark:hover:darkButtonSecondaryHover';
			break;
		case BUTTONTYPES.DESTRUCTIVE:
			specificButtonStyles = `text-lightButtonDeleteBg bg-lightButtonDeleteBg buttonstext hover:lightButtonDeleteHover dark:text-darkButtonDeleteBg dark:bg-darkButtonDeleteBg dark:hover:darkButtonDeleteHover ${
				// disable hover effects is config.disabled is true
				config.disabled
					? 'cursor-auto opacity-50'
					: 'cursor-pointer opacity-100 dark:hover:darkButtonDeleteHover hover:lightButtonDeleteHover'
			}`;
			break;
		case BUTTONTYPES.ADDTASK:
			specificButtonStyles = `text-lightButtonPrimaryBg bg-lightButtonPrimaryBg py-4 addTaskXPadding headingm dark:text-darkButtonPrimaryBg dark:bg-darkButtonPrimaryBg ${
				// disable hover effects is config.disabled is true
				config.disabled
					? 'cursor-auto opacity-60'
					: 'cursor-pointer opacity-100 dark:hover:bg-darkButtonPrimaryHover hover:bg-lightButtonPrimaryHover'
			}`;
			break;
	}
</script>

<button class={`${baseButtonStyles} ${specificButtonStyles}`}>
	<slot />
</button>
