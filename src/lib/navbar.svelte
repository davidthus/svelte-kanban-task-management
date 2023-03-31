<script>
	import { DarkLogoIcon, LightLogoIcon, MobileLogoIcon, VerticalDotsIcon } from '../assets';
	import { BUTTONTYPES } from '../constants/buttonTypes';
	import { themeTypes } from '../constants/themeTypes';
	import { boards } from '../stores/boardStore';
	import { data } from '../stores/dataStore';
	import { clickOutside } from '../utils/clickOutside';
	import Button from './button.svelte';

	const columnPresentInActiveBoard =
		$boards.find((board) => board.name === $data.activeBoard)?.columns.length > 0;
	const addTaskButtonConfig = {
		buttonType: BUTTONTYPES.ADDTASK,
		disabled: !columnPresentInActiveBoard
	};

	let isBoardOptionsShowing = false;

	function toggleBoardOptions() {
		isBoardOptionsShowing = isBoardOptionsShowing ? false : true;
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
				<Button config={addTaskButtonConfig}>+ Add New Task</Button>
				<button on:click={toggleBoardOptions} class="relative cursor-pointer">
					<VerticalDotsIcon />
					{#if isBoardOptionsShowing}
						<menu
							use:clickOutside
							on:click_outside={toggleBoardOptions}
							class="absolute bg-white right-0 rounded-lg w-max dark:bg-darkBodyBg flex flex-col p-4 gap-4"
						>
							<li class="bodyl text-grey cursor-pointer">Edit Board</li>
							<li class="bodyl text-red cursor-pointer">Delete Board</li>
						</menu>
					{/if}
				</button>
			</div>
		</div>
	</div>
</header>
