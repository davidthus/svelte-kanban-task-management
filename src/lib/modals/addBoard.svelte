<script>
	import { createForm } from 'svelte-forms-lib';
	import { BUTTONTYPES } from '../../constants/buttonTypes';
	import Button from '../button.svelte';
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

	$: console.log($form);

	const add = () => {
		$form.columns = $form.columns.concat({ name: '', tasks: [] });
		$errors.columns = $errors.columns.concat({ name: '', tasks: [] });
	};
	const remove = (event) => () => {
		$form.columns = $form.columns.filter((u, j) => j !== event.detail.index);
		$errors.columns = $errors.columns.filter((u, j) => j !== event.detail.index);
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
		on:remove={remove}
		name="columns"
		config={{ isArray: true, isError: $errors.columns, isBoard: true }}
		errorMessage={$errors.columns}
		errors={$errors.columns}
		{handleChange}
		values={$form.columns}>Columns</InputGroup
	>
	<Button config={{ buttonType: BUTTONTYPES.PRIMARYS }} type="submit">Create New Board</Button>
</form>
