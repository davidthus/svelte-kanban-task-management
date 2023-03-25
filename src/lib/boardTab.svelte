<script>
	import { BoardIcon } from '../assets';
	import { buttonStateTypes } from '../constants/buttonStateTypes';
	import { data, toggleActiveBoard } from '../stores/dataStore';
	export let board;
	let hover;

	const baseStyles =
		'flex gap-4 pl-8 py-4 rounded-r-full text-grey headingm items-center bg-lightButtonPrimaryBg dark:bg-darkButtonPrimaryBg hover:bg-lightInactiveBoardTabHover hover:text-purple dark:bg-darkInactiveBoardTabHover dark:hover:text-purple hover:cursor-pointer';

	const activeStyles = 'bg-purple text-white';
	let state = buttonStateTypes.DEFAULT;
	if (hover) state = buttonStateTypes.HOVER;
	if (data.activeBoard === board.name) state = buttonStateTypes.ACTIVE;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
	class={`${baseStyles} ${data.activeBoard === board.name && activeStyles}`}
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
	<BoardIcon {state} />
	{board.name}
</li>
