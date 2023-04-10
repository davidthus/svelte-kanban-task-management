<script>
	export let config;
	export let labelText;
	export let placeholderText;
	export let value;

	$: ({ isError, errorMessage, isTextarea } = config);

	const inputGroupStyles = 'headings text-grey flex flex-col gap-2 w-full';
	const input =
		'border border-grey/[.25] w-full rounded text-lightTextPrimary dark:text-darkTextPrimary focus:border-purple py-2 px-4 bg-transparent placeholder:text-lightTextPrimary dark:placeholder:text-darkTextPrimary bodyl relative ';
	const textarea = 'w-full min-h-[112px] resize-none';
	const inputErrorStyles = 'border-red focus:border-red';
	const inputErrorMessage =
		'text-red bodyl absolute top-2 right-4 z-30 bg-lightTaskBg dark:bg-darkTaskBg';
</script>

{#if isTextarea}
	<label class={inputGroupStyles}>
		{labelText}
		<textarea
			name="description"
			bind:value
			placeholder={placeholderText}
			class={`${input} ${textarea}`}
		/>
	</label>
{:else}
	<label class={inputGroupStyles}>
		{labelText}
		<div class="relative w-full">
			{#if isError}
				<span class={inputErrorMessage}>{errorMessage}</span>
			{/if}
			<input type="text" bind:value />
		</div>
	</label>
{/if}
