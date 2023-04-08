<script>
	import Circle from './circle.svelte';
	import TaskCard from './taskCard.svelte';

	export let column;
	export let columnIndex;
	export let boardIndex;
</script>

<section class="flex flex-col gap-6 min-w-[280px] w-[280px] pb-4">
	<!-- COLUMN HEADING -->
	<h2 class="text-grey headings gap-3 flex">
		<Circle {columnIndex} />
		{column.name.toUpperCase()} ({column.tasks.length})
	</h2>
	<!-- COLUMN HEADING -->
	{#if column.tasks.length > 0}
		{#each column.tasks as task, taskIndex}
			<TaskCard {task} {taskIndex} {columnIndex} {boardIndex} />
		{/each}
	{/if}
</section>
