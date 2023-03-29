<script>
	import Circle from './circle.svelte';
	import TaskCard from './taskCard.svelte';

	export let column;
	export let columnIndex;
	export let boardIndex;
</script>

<section class="flex flex-col gap-8 w-[280px]">
	<h2 class="text-grey headings gap-3 flex">
		<Circle {columnIndex} />
		{column.name.toUpperCase()} ({column.tasks.length})
	</h2>
	{#each column.tasks as task}
		<TaskCard {task} />
	{/each}
</section>
