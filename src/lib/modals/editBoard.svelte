<script>
	import { boards } from '../../stores/boardStore';
	import InputGroup from '../inputGroup.svelte';
	export let modalDetails;

	$: ({ boardIndex } = modalDetails);
	$: board = $boards[boardIndex];
	$: boardColumns = $boards[boardIndex].columns;

	const { form, handleChange, errors, handleSubmit } = createForm({
		initialValues: {
			name: board.name,
			columns: board.columns
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
		$form.columns = $form.columns.concat({ title: '', isCompleted: '' });
	};
	const remove = (i) => () => {
		$form.columns = $form.columns.filter((u, j) => j !== i);
	};
</script>

<h2 class="lightTextPrimary headingl">Add New Task</h2>
<form />
