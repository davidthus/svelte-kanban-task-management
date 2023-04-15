<script>
	import { boards } from '../../stores/boardStore';
	import InputGroup from '../inputGroup.svelte';
	export let modalDetails;

	$: ({ boardIndex, columnIndex, taskIndex } = modalDetails);
	$: task = $boards[boardIndex].columns[columnIndex].tasks[taskIndex];

	const { form, handleChange, errors, handleSubmit } = createForm({
		initialValues: {
			title: task.title,
			description: task.description,
			subtasks: task.subtasks
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
		$form.subtasks = $form.subtasks.concat({ name: '', email: '' });
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
	<div class="flex flex-col gap-4 w-full">
		<h3 class="bodym text-grey dark:text-darkTextPrimary text-left">Current Status</h3>
		<button
			on:click={() => {
				isDropdownOpen = !isDropdownOpen;
			}}
			use:focus={isDropdownOpen}
			class="border relative rounded border-grey/25 px-4 py-2 flex items-center justify-between focus:border-purple focus:border transition"
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
							class="bodyl text-grey text-left"
						>
							{column.name}
						</li>
					{/each}
				</menu>
			{/if}
		</button>
	</div>
</form>
