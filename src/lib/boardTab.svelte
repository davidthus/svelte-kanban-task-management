<script>
	import { BoardIcon } from '../assets';
	import { buttonStateTypes } from '../constants/buttonStateTypes';
	import { data, toggleActiveBoard } from '../stores/dataStore';
	export let board;
	let hover = false;

	const baseStyles =
		'flex gap-4 pl-8 py-4 w-11/12 rounded-r-full text-grey headingm items-center bg-lightAsideBg dark:bg-darkAsideBg hover:cursor-pointer';
	const hoverStyles =
		'hover:bg-lightInactiveBoardTabHover hover:text-purple dark:hover:bg-darkInactiveBoardTabHover dark:hover:text-purple';
	const activeStyles = 'bg-purple dark:bg-purple text-white dark:text-white';

	let buttonState = buttonStateTypes.DEFAULT;
	$: isButtonActive = $data.activeBoard === board.name;

	// determine the state of the boardTab to use the correct styling
	$: if (hover && !isButtonActive) {
		buttonState = buttonStateTypes.HOVER;
	} else if (!hover && !isButtonActive) {
		buttonState = buttonStateTypes.DEFAULT;
	} else if (isButtonActive) {
		buttonState = buttonStateTypes.ACTIVE;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
	class={`${baseStyles} ${buttonState === buttonStateTypes.HOVER ? hoverStyles : ''}${
		buttonState === buttonStateTypes.ACTIVE ? activeStyles : ''
	}`}
	on:mouseenter={() => {
		hover = true;
	}}
	on:mouseleave={() => {
		hover = false;
	}}
	on:click={() => {
		toggleActiveBoard(board.name);
	}}
>
	<BoardIcon {buttonState} />
	{board.name}
</li>
