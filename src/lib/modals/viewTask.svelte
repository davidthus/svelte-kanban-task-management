<script>
	import { focus } from 'focus-svelte';
	import { ArrowDownIcon, CheckIcon } from '../../assets';
	import { modalTypes } from '../../constants/modalTypes';
	import { boards, changeTaskStatus, toggleSubtask } from '../../stores/boardStore';
	import { changeModalDetails, openModal } from '../../stores/modalStore';
	import { subtasksCompleted } from '../../utils/subtasksCompleted';
	import Popout from '../popout.svelte';
	export let modalDetails;

	$: ({ boardIndex, columnIndex, taskIndex } = modalDetails);

	$: console.log(boardIndex, 'board', columnIndex, 'column', taskIndex, 'task');
	$: boardColumns = $boards[boardIndex].columns;
	// $: task = $boards[boardIndex].columns[columnIndex].tasks[taskIndex];
	$: task = $boards
		.find((_, currentBoardIndex) => currentBoardIndex === boardIndex)
		.columns.find((_, currentColumnIndex) => currentColumnIndex === columnIndex)
		.tasks.find((_, currentTaskIndex) => currentTaskIndex === taskIndex);

	$: console.log(columnIndex);
	$: console.log(task);

	let isDropdownOpen = false;

	function handleEdit() {
		openModal({ modalType: modalTypes.EDITTASK, details: modalDetails });
	}

	function handleDelete() {
		openModal({
			modalType: modalTypes.DELETETASK,
			details: modalDetails
		});
	}
</script>

<!-- TOP OF VIEW TASK -->
<div class="flex w-full justify-between">
	<h2 class="text-left text-lightTextPrimary headingl dark:text-darkTextPrimary">
		{task.title}
	</h2>
	<Popout {handleEdit} {handleDelete} />
</div>
<!-- TOP OF VIEW TASK -->
<!-- DESC -->
<p class="text-left text-grey bodyl">
	{#if task.description.length > 0}
		{task.description}
	{:else}
		{'No Description'}
	{/if}
</p>
<!-- DESC -->
<!-- SUBTASKS -->
<div class="flex w-full flex-col gap-4">
	<h3 class="text-left text-grey bodym dark:text-darkTextPrimary">
		Subtasks ({subtasksCompleted(task)})
	</h3>
	<ul class="flex w-full flex-col gap-2">
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
				class="flex items-center gap-4 rounded bg-lightBodyBg py-[13px] pl-3 pr-4 hover:bg-lightSubtaskCheckboxHover dark:bg-darkBodyBg hover:dark:bg-darkSubtaskCheckboxHover"
			>
				<div
					class={`flex h-4 w-4 items-center justify-center rounded-sm border border-grey/25 bg-lightSubtaskCheckboxBg dark:bg-darkBodyBg ${
						subtask.isCompleted ? 'border-purple bg-purple dark:bg-purple' : ''
					}`}
				>
					{#if subtask.isCompleted}
						<CheckIcon />
					{/if}
				</div>
				<p
					class={`flex text-lightTextPrimary bodym dark:text-darkTextPrimary ${
						subtask.isCompleted ? 'line-through opacity-50 mix-blend-normal' : ''
					}`}
				>
					{subtask.title}
				</p>
			</li>
		{/each}
	</ul>
	<!-- SUBTASKS -->
	<!-- CURRENT STATUS -->
	<div class="flex w-full flex-col gap-4">
		<h3 class="text-left text-grey bodym dark:text-darkTextPrimary">Current Status</h3>
		<button
			on:click={() => {
				isDropdownOpen = !isDropdownOpen;
			}}
			use:focus={isDropdownOpen}
			class="relative flex items-center justify-between rounded border border-grey/25 px-4 py-2 transition focus:border focus:border-purple"
		>
			<p class="text-lightTextPrimary bodyl dark:text-darkTextPrimary">{task.status}</p>
			<ArrowDownIcon />
			{#if isDropdownOpen}
				<menu
					class="absolute inset-x-0 top-[51px] flex w-full flex-col gap-2 rounded-lg bg-lightDropdownBg p-4 dark:bg-darkDropdownBg"
				>
					{#each boardColumns as column, newColumnIndex}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							on:click={() => {
								changeTaskStatus(task, boardIndex, newColumnIndex, columnIndex, taskIndex);
								const newTaskIndex =
									newColumnIndex === columnIndex
										? taskIndex
										: boardColumns[newColumnIndex].tasks.length;

								changeModalDetails({
									taskIndex: newTaskIndex,
									columnIndex: newColumnIndex,
									boardIndex
								});
							}}
							class="text-left text-grey bodyl"
						>
							{column.name}
						</li>
					{/each}
				</menu>
			{/if}
		</button>
	</div>
	<!-- CURRENT STATUS -->
</div>
