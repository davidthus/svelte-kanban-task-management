<script>
	import { boards } from '../../stores/boardStore';
	export let modalDetails;

	const { boardIndex, columnIndex, taskIndex } = modalDetails;

	$: task = $boards[boardIndex].columns[columnIndex].tasks[taskIndex];
</script>
