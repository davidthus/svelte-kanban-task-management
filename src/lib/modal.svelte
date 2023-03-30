<script>
	import { modalTypes } from '../constants/modalTypes';
	import { closeModal, modalInfo } from '../stores/modalStore';
	import {
		AddBoard,
		AddTask,
		DeleteBoard,
		DeleteTask,
		EditBoard,
		EditTask,
		ViewTask
	} from './modals';

	$: modalType = $modalInfo.modalType;
	$: modalDetails = $modalInfo.details;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={closeModal} class="fixed inset-0 w-screen h-screen flex items-center justify-center">
	{#if modalType === modalTypes.VIEWTASK}
		<ViewTask {modalDetails} />
	{:else if modalType === modalTypes.ADDTASK}
		<AddTask {modalDetails} />
	{:else if modalType === modalTypes.EDITTASK}
		<EditTask {modalDetails} />
	{:else if modalType === modalTypes.EDITBOARD}
		<EditBoard {modalDetails} />
	{:else if modalType === modalTypes.ADDBOARD}
		<AddBoard {modalDetails} />
	{:else if modalType === modalTypes.DELETEBOARD}
		<DeleteBoard {modalDetails} />
	{:else if modalType === modalTypes.DELETETASK}
		<DeleteTask {modalDetails} />
	{/if}
</div>
