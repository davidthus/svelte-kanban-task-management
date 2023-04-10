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

	$: ({ modalType, details: modalDetails } = $modalInfo);
	$: console.log(modalDetails);
</script>

<button
	on:click={closeModal}
	class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-normalTheme/50 mix-blend-normal"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<article
		on:click|stopPropagation
		class="flex w-full max-w-[480px] flex-col gap-6 rounded-md bg-lightTaskBg p-8 dark:bg-darkTaskBg"
	>
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
	</article>
</button>
