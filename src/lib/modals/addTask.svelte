<script>
	import { createForm } from 'svelte-forms-lib';
	import { BUTTONTYPES } from '../../constants/buttonTypes';
	import Button from '../button.svelte';
	import InputGroup from '../inputGroup.svelte';

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
	<Button type="submit" config={{ buttonType: BUTTONTYPES.PRIMARYS }}>Create Task</Button>
</form>
