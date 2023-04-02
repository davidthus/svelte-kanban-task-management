<script>
	import { ArrowDownIcon, CheckIcon } from '../../assets';
	import { modalTypes } from '../../constants/modalTypes';
	import { boards, changeTaskStatus, toggleSubtask } from '../../stores/boardStore';
	import { changeModalDetails, openModal } from '../../stores/modalStore';
	import { subtasksCompleted } from '../../utils/subtasksCompleted';
	import Popout from '../popout.svelte';
	export let modalDetails;

	$: ({ boardIndex, columnIndex, taskIndex } = modalDetails);

	$: boardColumns = $boards[boardIndex].columns;
	$: task = $boards[boardIndex].columns[columnIndex].tasks[taskIndex];
	$: console.log(task, modalDetails);

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
	<div class="flex flex-col gap-4 w-full">
		<h3 class="bodym text-grey dark:text-darkTextPrimary text-left">Current Status</h3>
		<button
			on:click={() => {
				isDropdownOpen = isDropdownOpen ? false : true;
			}}
			class="border relative rounded border-grey/25 px-4 py-2 flex items-center justify-between"
		>
			<p class="bodyl text-lightTextPrimary dark:text-darkTextPrimary">{task.status}</p>
			<ArrowDownIcon />
			{#if isDropdownOpen}
				<menu
					class="absolute inset-x-0 top-[51px] w-full rounded-lg bg-lightDropdownBg dark:bg-darkDropdownBg p-4 flex flex-col gap-2"
				>
					{#each boardColumns as column, newColumnIndex}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							on:click={() => {
								changeTaskStatus(task, boardIndex, newColumnIndex, columnIndex, taskIndex);
								const newTaskIndex = boardColumns[newColumnIndex].tasks.length - 1;
								changeModalDetails({
									taskIndex: newTaskIndex,
									columnIndex: newColumnIndex,
									boardIndex
								});
							}}
							class="bodyl text-grey text-left"
						>
							{column.name}
						</li>
					{/each}
				</menu>
			{/if}
		</button>
	</div>
</div>
