<script>
	import { BoardIcon } from '../assets';
	import { buttonStateTypes } from '../constants/buttonStateTypes';
	import { boards } from '../stores/boardStore';
	import BoardTab from './boardTab.svelte';
</script>

<aside class="flex flex-col justify-between max-w-xs fixed left-0 bottom-0 h-[90vh]">
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
			><BoardIcon state={buttonStateTypes.HOVER} /> + Create New Board</button
		>
	</section>
</aside>
