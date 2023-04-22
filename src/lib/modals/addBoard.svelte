<script>
	import { createForm } from 'svelte-forms-lib';
	import InputGroup from '../inputGroup.svelte';

	const { form, handleChange, errors, handleSubmit } = createForm({
		initialValues: {
			name: '',
			columns: [
				{ name: 'Todo', columns: [] },
				{ name: 'Doing', columns: [] }
			]
		},
		validate: (values) => {
			let errs = {};
			if (values.name === '') {
				errs['name'] = "Can't be empty";
			}
			return errs;
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values));
		}
	});

	const add = () => {
		$form.columns = $form.columns.concat({ name: '', tasks: [] });
		$errors.columns = $errors.columns.concat({ name: '', tasks: [] });
	};
	const remove = (i) => () => {
		$form.columns = $form.subtasks.filter((u, j) => j !== i);
		$errors.columns = $errors.subtasks.filter((u, j) => j !== i);
	};
</script>

<h2 class="text-lightTextPrimary headingl dark:text-darkTextPrimary">Add New Board</h2>
<form class="flex w-full flex-col gap-6" on:submit={handleSubmit}>
	<InputGroup
		name="name"
		config={{ isError: $errors.name }}
		placeholderText="e.g. Take coffee break"
		errorMessage={$errors.name}
		{handleChange}
		value={$form.name}>Name</InputGroup
	>
	<InputGroup
		on:add={add}
		name="columns"
		config={{ isArray: true, isError: $errors.columns, isBoard: true }}
		errorMessage={$errors.columns}
		errors={$errors.columns}
		{handleChange}
		values={$form.columns}>Columns</InputGroup
	>
</form>
