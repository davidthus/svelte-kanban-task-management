<script>
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
</form>
