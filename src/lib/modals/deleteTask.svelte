<script>
	import { BUTTONTYPES } from '../../constants/buttonTypes';
	import { deleteTask } from '../../stores/boardStore';
	import { closeModal } from '../../stores/modalStore';
	import Button from '../button.svelte';
	export let modalDetails;
	$: ({ boardIndex, columnIndex, taskIndex } = modalDetails);

	function handleDelete() {
		deleteTask(boardIndex, columnIndex, taskIndex);
		closeModal();
	}

	function handleCancel() {
		closeModal();
	}
</script>

<h2 class="text-red text-left headingl">Delete this task?</h2>
<p class="bodyl text-grey text-left">
	Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot
	be reversed.
</p>
<div class="flex gap-4 w-full">
	<Button config={{ buttonType: BUTTONTYPES.DESTRUCTIVE }} on:click={handleDelete}>Delete</Button>
	<Button config={{ buttonType: BUTTONTYPES.SECONDARY }} on:click={handleCancel}>Cancel</Button>
</div>
