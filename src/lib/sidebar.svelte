<script>
	import ThemeToggler from '$lib/themeToggler.svelte';
	import { BoardIcon, HideIcon } from '../assets';
	import { buttonStateTypes } from '../constants/buttonStateTypes';
	import { modalTypes } from '../constants/modalTypes';
	import { boards } from '../stores/boardStore';
	import { toggleSidebar, toggleTheme } from '../stores/dataStore';
	import { openModal } from '../stores/modalStore';
	import BoardTab from './boardTab.svelte';

	let hideSidebarButtonState = buttonStateTypes.DEFAULT;
</script>

<aside
	class="fixed left-0 bottom-0 z-30 flex h-[90vh] w-full max-w-xs flex-col justify-between border-r border-lightBorder bg-lightAsideBg pt-4 pb-8 dark:border-darkBorder dark:bg-darkAsideBg"
>
	<!-- BOARD TAB BUTTONS -->
	<section class="flex flex-col">
		<h3 class="pl-8 text-grey headings">ALL BOARDS({$boards.length})</h3>
		<menu class="mt-5 mb-3.5 flex flex-col">
			{#if $boards.length > 0}
				{#each $boards as board}
					<BoardTab {board} />
				{/each}
			{/if}
		</menu>
		<button
			on:click={() => openModal({ modalType: modalTypes.ADDBOARD, details: {} })}
			class="flex items-center gap-4 pl-8 text-purple headingm hover:cursor-pointer"
			><BoardIcon buttonState={buttonStateTypes.HOVER} />+ Create New Board</button
		>
	</section>
	<!-- BOARD TAB BUTTONS -->
	<!-- BOTTOM SIDEBAR SECTION -->
	<section class="flex w-full flex-col items-center gap-2">
		<ThemeToggler {toggleTheme} />
		<!-- HIDE SIDEBAR BUTTON -->
		<div class="flex w-full justify-start">
			<button
				class="flex w-[90%] items-center gap-4 rounded-r-full py-4 pl-8 text-grey headingm hover:bg-purple/10 hover:text-purple dark:hover:bg-white"
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
		<!-- HIDE SIDEBAR BUTTON -->
	</section>
	<!-- BOTTOM SIDEBAR SECTION -->
</aside>
