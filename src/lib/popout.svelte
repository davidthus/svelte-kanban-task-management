<script>
	import { VerticalDotsIcon } from '../assets';
	import { clickOutside } from '../utils/clickOutside';

	export let navbarOptions;
	export let handleEdit;
	export let handleDelete;

	let isOptionsShowing = false;
	function toggleOptions() {
		console.log('clicked');
		isOptionsShowing = !isOptionsShowing;
	}
	function closeOptions() {
		isOptionsShowing = false;
	}
</script>

<button
	on:click={toggleOptions}
	use:clickOutside
	on:click_outside={closeOptions}
	class="relative cursor-pointer"
>
	<VerticalDotsIcon />
	{#if isOptionsShowing}
		<div
			class={`absolute bg-white right-0 ${
				!navbarOptions ? 'translate-x-1/2' : ''
			} rounded-lg w-max dark:bg-darkBodyBg flex flex-col p-4 gap-4`}
		>
			<button class="bodyl text-grey cursor-pointer text-left" on:click={handleEdit}
				>Edit {navbarOptions ? 'Board' : 'Task'}</button
			>
			<button class="bodyl text-red cursor-pointer text-left" on:click={handleDelete}
				>Delete {navbarOptions ? 'Board' : 'Task'}</button
			>
		</div>
	{/if}
</button>
