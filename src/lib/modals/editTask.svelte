<script>
	import { ArrowDownIcon } from '../../assets';
	import { boards, changeTaskStatus } from '../../stores/boardStore';
	import { changeModalDetails } from '../../stores/modalStore';
	import InputGroup from '../inputGroup.svelte';
	export let modalDetails;

	$: ({ boardIndex, columnIndex, taskIndex } = modalDetails);
	$: task = $boards[boardIndex].columns[columnIndex].tasks[taskIndex];
	$: boardColumns = $boards[boardIndex].columns;
	let isDropdownOpen = false;

	const { form, handleChange, errors, handleSubmit } = createForm({
		initialValues: {
			title: task.title,
			description: task.description,
			subtasks: task.subtasks,
			status: task.status
		},
		validate: (values) => {
			let errs = {};
			if (values.title === '') {
				errs['title'] = "Can't be empty";
			}
			return errs;
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values));
		}
	});

	const add = () => {
		$form.subtasks = $form.subtasks.concat({ title: '', isCompleted: '' });
	};
	const remove = (i) => () => {
		$form.subtasks = $form.subtasks.filter((u, j) => j !== i);
	};
</script>

<h2 class="lightTextPrimary headingl">Add New Task</h2>
<form on:submit={handleSubmit}>
	<InputGroup
		name="title"
		config={{ isTextArea: false, isError: $errors.title }}
		placeholderText="e.g. Take coffee break"
		errorMessage={$errors.title}
		{handleChange}
		value={$form.title}>Title</InputGroup
	>
	<InputGroup
		config={{ isTextArea: true }}
		{handleChange}
		placeholderText="e.g. It’s always good to take a break. This 15 minute break will 
	recharge the batteries a little."
		value={$form.description}>Description</InputGroup
	>
	<InputGroup
		on:add={add}
		on:remove={remove}
		{handleChange}
		config={{ isArray: true, isError: $errors.subtasks }}
		errorMessage={$errors.subtasks}
		errors={$errors.subtasks}
		values={$form.subtasks}
		name="subtasks">Subtasks</InputGroup
	>
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
</form>
