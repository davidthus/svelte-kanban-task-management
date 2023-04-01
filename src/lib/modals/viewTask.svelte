<script>
	import { boards } from '../../stores/boardStore';
	import Popout from '../popout.svelte';
	export let modalDetails;

	const { boardIndex, columnIndex, taskIndex } = modalDetails;

	$: task = $boards[boardIndex].columns[columnIndex].tasks[taskIndex];

	function handleEdit() {}

	function handleDelete() {}
</script>

<div class="flex justify-between">
	<h2 class="text-lightTextPrimary dark:text-darkTextPrimary headingl">
		{task.title}
	</h2>
	<Popout {handleEdit} {handleDelete} navbarOptions={false} />
</div>
