<script>
	import { createForm } from 'svelte-forms-lib';
	import { ArrowDownIcon } from '../../assets';
	import { BUTTONTYPES } from '../../constants/buttonTypes';
	import { addTask, boards } from '../../stores/boardStore';
	import Button from '../button.svelte';
	import InputGroup from '../inputGroup.svelte';
	export let modalDetails;

	$: ({ boardIndex } = modalDetails);

	$: boardColumns = $boards[boardIndex].columns;

	let taskStatus = boardColumns[0].name;
	let isDropdownOpen = false;
	const { form, handleChange, errors, handleSubmit } = createForm({
		initialValues: {
			title: '',
			description: '',
			subtasks: [
				{
					title: '',
					isCompleted: false
				},
				{
					title: '',
					isCompleted: false
				}
			]
		},
		validate: (values) => {
			let errs = { subtasks: [] };
			if (values.title === '') {
				errs['title'] = "Can't be empty";
			}
			values.subtasks.forEach((subtask, index) => {
				if (subtask.title === '') {
					console.log(errs, subtask, index);
					errs.subtasks[index].title = "Can't be empty";
				}
			});
			return errs;
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values));
			const columnIndex = boardColumns.findIndex((column) => column.name === taskStatus);
			addTask({ values, status: taskStatus }, boardIndex, columnIndex);
		}
	});

	const add = () => {
		$form.subtasks = $form.subtasks.concat({ name: '', tasks: [] });
		$errors.subtasks = $errors.subtasks.concat({ name: '', tasks: [] });
	};
	const remove = (event) => () => {
		console.log(event);
		$form.subtasks = $form.subtasks.filter((u, j) => j !== event.detail.index);
		$errors.subtasks = $errors.subtasks.filter((u, j) => j !== event.detail.index);
	};
</script>

<h2 class="text-lightTextPrimary headingl dark:text-darkTextPrimary">Add New Task</h2>
<form on:submit={handleSubmit} class="flex w-full flex-col gap-6">
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
			<p class="text-lightTextPrimary bodyl dark:text-darkTextPrimary">{taskStatus}</p>
			<ArrowDownIcon />
			{#if isDropdownOpen}
				<menu
					class="absolute inset-x-0 top-[51px] flex w-full flex-col gap-2 rounded-lg bg-lightDropdownBg p-4 dark:bg-darkDropdownBg"
				>
					{#each boardColumns as column, newColumnIndex}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							on:click={() => {
								taskStatus = column.name;
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
	<Button type="submit" config={{ buttonType: BUTTONTYPES.PRIMARYS }}>Create Task</Button>
</form>
