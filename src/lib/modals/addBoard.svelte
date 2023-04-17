<script>
	import InputGroup from '../inputGroup.svelte';

	export let modalDetails;

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
		$form.columns = $form.columns.concat({ name: '', columns: [] });
		$errors.columns = $errors.columns.concat({ name: '', columns: [] });
	};
	const remove = (i) => () => {
		$form.columns = $form.subtasks.filter((u, j) => j !== i);
		$errors.columns = $errors.subtasks.filter((u, j) => j !== i);
	};
</script>

<h2 class="lightTextPrimary headingl">Add New Board</h2>
<form on:submit={handleSubmit}>
	<InputGroup
		name="name"
		config={{ isError: $errors.name }}
		placeholderText="e.g. Take coffee break"
		errorMessage={$errors.name}
		{handleChange}
		value={$form.name}>Board Name</InputGroup
	>
	<InputGroup
		name="columns"
		config={{ isArray: true, isError: $errors.columns }}
		errorMessage={$errors.columns}
		{handleChange}
		values={$form.columns}>Board Columns</InputGroup
	>
</form>
