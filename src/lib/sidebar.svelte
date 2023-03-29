<script>
	import ThemeToggler from '$lib/themeToggler.svelte';
	import { BoardIcon, HideIcon } from '../assets';
	import { buttonStateTypes } from '../constants/buttonStateTypes';
	import { boards } from '../stores/boardStore';
	import { toggleSidebar, toggleTheme } from '../stores/dataStore';
	import BoardTab from './boardTab.svelte';

	let hideSidebarButtonState = buttonStateTypes.DEFAULT;
</script>

<aside
	class="flex flex-col justify-between max-w-xs w-full fixed left-0 bottom-0 pt-4 pb-8 h-[90vh] bg-lightAsideBg dark:bg-darkAsideBg border-r border-lightBorder dark:border-darkBorder"
>
	<section class="flex flex-col gap-5 ">
		<h3 class="headings text-grey pl-8">ALL BOARDS({$boards.length})</h3>
		<menu class="flex flex-col">
			{#if $boards.length > 0}
				{#each $boards as board}
					<BoardTab {board} />
				{/each}
			{/if}
		</menu>
		<button class="flex gap-4 pl-8 py-4 items-center hover:cursor-pointer text-purple headingm"
			><BoardIcon buttonState={buttonStateTypes.HOVER} />+ Create New Board</button
		>
	</section>
	<section class="flex flex-col w-full items-center gap-2">
		<ThemeToggler {toggleTheme} />
		<div class="w-full flex justify-start">
			<button
				class="w-[90%] rounded-r-full pl-8 py-4 text-grey hover:text-purple hover:bg-purple/10 dark:hover:bg-white headingm flex items-center gap-4"
				on:mouseenter={() => {
					hideSidebarButtonState = buttonStateTypes.HOVER;
				}}
				on:mouseleave={() => {
					hideSidebarButtonState = buttonStateTypes.DEFAULT;
				}}
				on:click={toggleSidebar}
			>
				<HideIcon buttonState={hideSidebarButtonState} />
				Hide Sidebar</button
			>
		</div>
	</section>
</aside>
