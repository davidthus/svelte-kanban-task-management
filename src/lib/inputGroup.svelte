<script>
	export let config;
	export let placeholderText;
	export let value;
	export let errorMessage;
	export let name;
	export let handleChange;

	$: ({ isError, isTextarea } = config);

	const inputGroupStyles = 'headings text-grey flex flex-col gap-2 w-full';
	const input =
		'border border-grey/[.25] w-full rounded text-lightTextPrimary dark:text-darkTextPrimary focus:border-purple py-2 px-4 bg-transparent placeholder:text-lightTextPrimary dark:placeholder:text-darkTextPrimary bodyl relative ';
	const textarea = 'w-full min-h-[112px] resize-none';
	const inputErrorStyles = 'border-red focus:border-red';
	const inputErrorMessage =
		'text-red bodyl absolute top-2 right-4 z-30 bg-lightTaskBg dark:bg-darkTaskBg';
</script>

<label class={inputGroupStyles}>
	<slot />
	{#if isTextarea}
		<textarea
			name="description"
			on:change={handleChange}
			bind:value
			placeholder={placeholderText}
			class={`${input} ${textarea}`}
		/>
	{:else}
		<div class="relative w-full">
			{#if isError} <small class={inputErrorMessage}>{errorMessage}</small> {/if}
			<input
				type="text"
				on:change={handleChange}
				{name}
				bind:value
				class={`${input} ${isError ? inputErrorStyles : ''}`}
			/>
		</div>
	{/if}
</label>
