<script>
	import { DarkLogoIcon, LightLogoIcon, MobileLogoIcon } from '../assets';
	import { BUTTONTYPES } from '../constants/buttonTypes';
	import { modalTypes } from '../constants/modalTypes';
	import { themeTypes } from '../constants/themeTypes';
	import { boards } from '../stores/boardStore';
	import { data } from '../stores/dataStore';
	import { openModal } from '../stores/modalStore';
	import Button from './button.svelte';
	import Popout from './popout.svelte';

	const columnPresentInActiveBoard =
		$boards.find((board) => board.name === $data.activeBoard)?.columns.length > 0;
	$: boardIndex = $boards.findIndex((board) => board.name === $data.activeBoard);
	const addTaskButtonConfig = {
		buttonType: BUTTONTYPES.ADDTASK,
		disabled: !columnPresentInActiveBoard
	};

	function handleEdit() {
		openModal({
			modalType: modalTypes.EDITBOARD,
			details: { boardIndex }
		});
	}

	function handleDelete() {
		openModal({
			modalType: modalTypes.DELETEBOARD,
			details: { boardIndex }
		});
	}
</script>

<header
	class="fixed top-0 left-0 right-0 z-10 flex h-[10vh] w-screen items-center bg-lightNavbarBg dark:bg-darkNavbarBg"
>
	<aside
		class={`flex w-full max-w-xs border-r border-lightBorder pt-8 pl-8 dark:border-darkBorder ${
			!$data.sidebarOpen && 'double-border'
		} h-full`}
	>
		{#if $data.theme === themeTypes.LIGHTTHEME}
			<DarkLogoIcon />
		{:else if $data.theme === themeTypes.DARKTHEME}
			<LightLogoIcon />
		{/if}
	</aside>
	<div
		class="h-full w-full flex-1 border-b border-lightBorder pl-6 pr-8 pt-5 pb-7 dark:border-darkBorder"
	>
		<div class="flex items-center justify-between">
			<h1 class="text-lightTextPrimary headingxl dark:text-darkTextPrimary">{$data.activeBoard}</h1>
			<div class="flex items-center justify-center gap-6">
				<Button
					config={addTaskButtonConfig}
					on:click={() => openModal({ modalType: modalTypes.ADDTASK, details: { boardIndex } })}
					>+ Add New Task</Button
				>
				<Popout {handleEdit} {handleDelete} navbarOptions={true} />
			</div>
		</div>
	</div>
</header>
