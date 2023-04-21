<script>
	import { createEventDispatcher } from 'svelte';
	import { BUTTONTYPES } from '../constants/buttonTypes';
	import Button from './button.svelte';

	export let config = {};
	export let placeholderText = '';
	export let placeholderTexts = [];
	export let value = '';
	export let values = [];
	export let errors = [];
	export let errorMessage = '';
	export let name = '';
	export let handleChange = '';

	$: ({ isError = false, isTextarea = false, isArray = false } = config);
	const dispatch = createEventDispatcher();

	const inputGroupStyles = 'text-left text-grey bodym dark:text-white flex flex-col gap-2 w-full';
	const input =
		'border border-grey/[.25] w-full rounded text-lightTextPrimary dark:text-darkTextPrimary focus:border-purple py-2 px-4 bg-lightTaskBg dark:bg-darkTaskBg placeholder:text-grey dark:placeholder:text-darkTextPrimary bodyl relative outline-0';
	const textarea = 'w-full min-h-[112px] resize-none';
	const inputErrorStyles = 'border-red focus:border-red';
	const inputErrorMessage =
		'text-red bodyl absolute top-2 right-4 z-30 bg-lightTaskBg dark:bg-darkTaskBg';
	const arrayInputErrorMessage =
		'text-red bodyl absolute top-2 right-[47px] z-30 bg-lightTaskBg dark:bg-darkTaskBg';

	function removeValue() {
		dispatch('remove');
	}
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
	{:else if isArray}
		<div class="relative flex w-full flex-col gap-3">
			{#each values as value, index}
				<div class="flex items-center gap-4">
					{#if errors[index].name}
						<small class={arrayInputErrorMessage}>{errors[index].name}</small>
					{/if}
					<input
						name={`${name}[${index}].name`}
						class={`${input} ${errors[index].name ? inputErrorStyles : ''}`}
						placeholder={placeholderTexts[index] ?? ''}
						on:change={handleChange}
						on:blur={handleChange}
						bind:value={value.name}
					/>
				</div>
			{/each}
			<div class="mt-1 w-full">
				<Button config={{ buttonType: BUTTONTYPES.SECONDARY }} on:click={dispatch('add')}
					>+ Add New Column</Button
				>
			</div>
		</div>
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
