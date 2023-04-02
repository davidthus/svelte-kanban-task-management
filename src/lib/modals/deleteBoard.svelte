<script>
	import { BUTTONTYPES } from '../../constants/buttonTypes';
	import { boards, deleteBoard } from '../../stores/boardStore';
	import { closeModal } from '../../stores/modalStore';
	import Button from '../button.svelte';
	export let modalDetails;
	$: ({ boardIndex } = modalDetails);

	function handleDelete() {
		deleteBoard(boardIndex);
		closeModal();
	}

	function handleCancel() {
		closeModal();
	}
	$: boardName = $boards[boardIndex].name;
</script>

<h2 class="text-red text-left headingl">Delete this board?</h2>
<p class="bodyl text-grey text-left">
	Are you sure you want to delete the ‘{boardName}’ board? This action will remove all columns and
	tasks and cannot be reversed.
</p>
<div class="flex gap-4 w-full">
	<Button config={{ buttonType: BUTTONTYPES.DESTRUCTIVE }} on:click={handleDelete}>Delete</Button>
	<Button config={{ buttonType: BUTTONTYPES.SECONDARY }} on:click={handleCancel}>Cancel</Button>
</div>
