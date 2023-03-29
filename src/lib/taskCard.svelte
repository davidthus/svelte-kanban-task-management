<script>
	import { subtasksCompleted } from '../utils/subtasksCompleted';
	export let task;
</script>

<article
	class="w-full py-[23px] px-4 dark:bg-darkTaskBg bg-lightTaskBg rounded-lg lightTaskBoxShadow dark:darkTaskBoxShadow flex flex-col gap-2 cursor-pointer"
>
	<h3
		class="headingm text-lightTextPrimary dark:text-darkTextPrimary transition hover:text-purple dark:hover:text-purple"
	>
		{task.title}
	</h3>
	<p class="bodym text-grey">{subtasksCompleted(task)}</p>
</article>
