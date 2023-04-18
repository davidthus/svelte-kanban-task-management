<script>
	import { VerticalDotsIcon } from '../assets';
	import { clickOutside } from '../utils/clickOutside';

	export let navbarOptions = false;
	export let handleEdit;
	export let handleDelete;

	let isOptionsShowing = false;
	function toggleOptions() {
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
			class={`absolute right-0 bg-white ${
				!navbarOptions ? 'translate-x-1/2' : ''
			} flex w-max flex-col gap-4 rounded-lg p-4 dark:bg-darkBodyBg`}
		>
			<button class="cursor-pointer text-left text-grey bodyl" on:click={handleEdit}
				>Edit {navbarOptions ? 'Board' : 'Task'}</button
			>
			<button class="cursor-pointer text-left text-red bodyl" on:click={handleDelete}
				>Delete {navbarOptions ? 'Board' : 'Task'}</button
			>
		</div>
	{/if}
</button>
