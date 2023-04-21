<script>
	import { BUTTONTYPES } from '../constants/buttonTypes';
	export let config;
	export let type = 'button';

	const baseButtonStyles =
		'rounded-full flex-1 border-0 flex justify-center items-center py-2 px-12';
	const disabledStyles = 'opacity-25 cursor-default';
	let specificButtonStyles;

	switch (config.buttonType) {
		case BUTTONTYPES.PRIMARYL:
			specificButtonStyles =
				'text-white bg-lightButtonPrimaryBg py-[0.9rem] px-12 headingm hover:bg-lightButtonPrimaryHover';
			break;
		case BUTTONTYPES.PRIMARYS:
			specificButtonStyles =
				'text-white bg-lightButtonPrimaryBg buttonstext hover:bg-lightButtonPrimaryHover';
			break;
		case BUTTONTYPES.SECONDARY:
			specificButtonStyles =
				'text-purple bg-lightButtonSecondaryBg w-full buttonstext hover:bg-lightButtonSecondaryHover dark:bg-darkButtonSecondaryBg dark:hover:bg-darkButtonSecondaryBg';
			break;
		case BUTTONTYPES.DESTRUCTIVE:
			specificButtonStyles = `text-white bg-lightButtonDeleteBg buttonstext hover:bg-lightButtonDeleteHover dark:text-darkButtonDeleteBg dark:bg-darkButtonDeleteBg dark:hover:bg-darkButtonDeleteHover ${
				// disable hover effects is config.disabled is true
				config.disabled
					? 'cursor-auto opacity-50'
					: 'cursor-pointer opacity-100 dark:hover:bg-darkButtonDeleteHover hover:bg-lightButtonDeleteHover'
			}`;
			break;
		case BUTTONTYPES.ADDTASK:
			specificButtonStyles = `text-white bg-lightButtonPrimaryBg py-4 addTaskXPadding headingm dark:text-white dark:bg-darkButtonPrimaryBg ${
				// disable hover effects is config.disabled is true
				config.disabled
					? 'cursor-auto opacity-60'
					: 'cursor-pointer opacity-100 dark:hover:bg-darkButtonPrimaryHover hover:bg-lightButtonPrimaryHover'
			}`;
			break;
	}
</script>

<button
	on:click
	{type}
	class={`${baseButtonStyles} ${specificButtonStyles} ${
		config?.disabled ? disabledStyles : 'cursor-pointer'
	}`}
>
	<slot />
</button>
