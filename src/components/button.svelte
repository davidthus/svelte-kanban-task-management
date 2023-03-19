<script>
	import { BUTTONTYPES } from '../constants/buttonTypes';
	export let config;

	const baseButtonStyles =
		'rounded-full border-0 cursor-pointer flex justify-center items-center py-2 px-12';
	let specificButtonStyles;

	switch (config.buttonType) {
		case BUTTONTYPES.PRIMARYL:
			specificButtonStyles = '';
			break;
		case BUTTONTYPES.PRIMARYS:
			specificButtonStyles = '';
			break;
		case BUTTONTYPES.SECONDARY:
			specificButtonStyles = '';
			break;
		case BUTTONTYPES.DESTRUCTIVE:
			specificButtonStyles = '';
			break;
		case BUTTONTYPES.ADDTASK:
			specificButtonStyles = '';
			break;
	}
</script>

<button class={`${baseButtonStyles}`}>
	<slot />
</button>
