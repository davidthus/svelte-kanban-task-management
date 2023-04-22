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
</script>

<article
	class="flex w-full cursor-pointer flex-col gap-2 rounded-lg bg-lightTaskBg py-[23px] px-4 lightTaskBoxShadow dark:bg-darkTaskBg dark:darkTaskBoxShadow"
>
	<button
		on:click={() => openModal(viewTaskModalPayload)}
		class="cursor-pointer text-left text-lightTextPrimary transition headingm hover:text-purple dark:text-darkTextPrimary dark:hover:text-purple"
	>
		{task.title}
	</button>
	<p class="text-grey bodym">{subtasksCompleted(task)} subtasks</p>
</article>
