<script>
	export let modalDetails;
</script>

<h2 class="lightTextPrimary headingl">Add New Board</h2>
<form on:submit={handleSubmit}>
	<InputGroup
		name="title"
		config={{ isTextArea: false, isError: $errors.title }}
		placeholderText="e.g. Take coffee break"
		errorMessage={$errors.title}
		{handleChange}
		value={$form.title}>Title</InputGroup
	>
	<InputGroup
		config={{ isTextArea: true }}
		{handleChange}
		placeholderText="e.g. It’s always good to take a break. This 15 minute break will 
	recharge the batteries a little."
		value={$form.description}>Description</InputGroup
	>
</form>
