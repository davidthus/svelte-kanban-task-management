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
	class="fixed z-50 inset-0 w-screen h-screen flex items-center justify-center bg-normalTheme/50 mix-blend-normal"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<article
		on:click|stopPropagation
		class="max-w-[480px] bg-lightTaskBg dark:bg-darkTaskBg w-full rounded-md p-8 flex flex-col gap-6"
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
