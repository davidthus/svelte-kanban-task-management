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
	};
	const remove = (i) => () => {
		$form.columns = $form.subtasks.filter((u, j) => j !== i);
	};
</script>

<h2 class="lightTextPrimary headingl">Add New Board</h2>
<form on:submit={handleSubmit}>
	<InputGroup
		name="name"
		config={{ isTextArea: false, isError: $errors.name }}
		placeholderText="e.g. Take coffee break"
		errorMessage={$errors.name}
		{handleChange}
		value={$form.name}>Name</InputGroup
	>
</form>
