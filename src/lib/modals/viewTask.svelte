<script>
	import { CheckIcon } from '../../assets';
	import { boards, toggleSubtask } from '../../stores/boardStore';
	import { subtasksCompleted } from '../../utils/subtasksCompleted';
	import Popout from '../popout.svelte';
	export let modalDetails;

	const { boardIndex, columnIndex, taskIndex } = modalDetails;

	$: task = $boards[boardIndex].columns[columnIndex].tasks[taskIndex];

	function handleEdit() {}

	function handleDelete() {}
</script>

<div class="flex justify-between w-full">
	<h2 class="text-lightTextPrimary dark:text-darkTextPrimary headingl">
		{task.title}
	</h2>
	<Popout {handleEdit} {handleDelete} navbarOptions={false} />
</div>
<p class="bodyl text-grey text-left">
	{#if task.description.length > 0}
		{task.description}
	{:else}
		{'No Description'}
	{/if}
</p>
<div class="flex flex-col gap-4 w-full">
	<h3 class="bodym text-grey dark:text-darkTextPrimary text-left">
		Subtasks ({subtasksCompleted(task)})
	</h3>
	<ul class="flex flex-col gap-2 w-full">
		{#each task.subtasks as subtask, subtaskIndex}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				on:click={toggleSubtask(
					subtaskIndex,
					taskIndex,
					boardIndex,
					columnIndex,
					subtask.isCompleted
				)}
				class="flex pl-3 pr-4 py-[13px] gap-4 items-center bg-lightBodyBg dark:bg-darkBodyBg hover:bg-lightSubtaskCheckboxHover hover:dark:bg-darkSubtaskCheckboxHover rounded"
			>
				<div
					class={`bg-lightSubtaskCheckboxBg dark:bg-darkBodyBg flex items-center justify-center w-4 h-4 rounded-sm border border-grey/25 ${
						subtask.isCompleted ? 'bg-purple dark:bg-purple border-purple' : ''
					}`}
				>
					{#if subtask.isCompleted}
						<CheckIcon />
					{/if}
				</div>
				<p
					class={`flex bodym text-lightTextPrimary dark:text-darkTextPrimary ${
						subtask.isCompleted ? 'line-through mix-blend-normal opacity-50' : ''
					}`}
				>
					{subtask.title}
				</p>
			</li>
		{/each}
	</ul>
</div>
