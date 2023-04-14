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
	class="w-screen flex items-center fixed h-[10vh] z-10 top-0 left-0 right-0 bg-lightNavbarBg dark:bg-darkNavbarBg"
>
	<aside
		class={`flex pt-8 max-w-xs w-full pl-8 border-r border-lightBorder dark:border-darkBorder ${
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
		class="flex-1 w-full h-full border-b border-lightBorder dark:border-darkBorder pl-6 pr-8 pt-5 pb-7"
	>
		<div class="flex justify-between items-center">
			<h1 class="headingxl text-lightTextPrimary dark:text-darkTextPrimary">{$data.activeBoard}</h1>
			<div class="flex justify-center items-center gap-6">
				<Button config={addTaskButtonConfig} on:click={openModal({ modalType: modalTypes.ADDTASK })}
					>+ Add New Task</Button
				>
				<Popout {handleEdit} {handleDelete} navbarOptions={true} />
			</div>
		</div>
	</div>
</header>
