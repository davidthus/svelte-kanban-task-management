<script>
	import { modalTypes } from '../constants/modalTypes';
	import { openModal } from '../stores/modalStore';
	import { subtasksCompleted } from '../utils/subtasksCompleted';
	export let task;
	export let taskIndex;
	export let columnIndex;
	export let boardIndex;

	$: viewTaskModalPayload = {
		modalType: modalTypes.VIEWTASK,
		details: {
			taskIndex,
			columnIndex,
			boardIndex
		}
	};
	$: console.log(viewTaskModalPayload);
</script>

<article
	class="w-full py-[23px] px-4 dark:bg-darkTaskBg bg-lightTaskBg rounded-lg lightTaskBoxShadow dark:darkTaskBoxShadow flex flex-col gap-2 cursor-pointer"
>
	<button
		on:click={openModal(viewTaskModalPayload)}
		class="headingm text-lightTextPrimary dark:text-darkTextPrimary transition hover:text-purple dark:hover:text-purple text-left"
	>
		{task.title}
	</button>
	<p class="bodym text-grey">{subtasksCompleted(task)}</p>
</article>
