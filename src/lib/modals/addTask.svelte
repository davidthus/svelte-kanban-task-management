<script>
	export let modalDetails;

	let title = '';
</script>

<h2 class="lightTextPrimary headingl">Add New Task</h2>
<form>
	<label class="headings text-grey flex flex-col gap-2">
		<input type="text" bind:value={title} class="" />
	</label>
</form>
