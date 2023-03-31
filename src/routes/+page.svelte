<script>
	import Column from '$lib/column.svelte';
	import { boards } from '../stores/boardStore';
	import { data } from '../stores/dataStore';

	$: board = $boards.find((board) => board.name === $data.activeBoard);
	$: boardIndex = $boards.findIndex((brd) => brd.name === $data.activeBoard);
</script>

<main class="flex gap-8 w-full">
	{#each board.columns as column, columnIndex}
		<Column {column} {columnIndex} {boardIndex} />
	{/each}
	<button
		class="min-w-[280px] headingxl lightNewColumn dark:darkNewColumn text-grey hover:text-purple"
	>
		+ New Column
	</button>
</main>
