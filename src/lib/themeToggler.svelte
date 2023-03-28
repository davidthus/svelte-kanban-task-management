<script>
	import { MoonIcon, SunIcon } from '../assets';
	import { themeTypes } from '../constants/themeTypes';
	import { data } from '../stores/dataStore';
	export let toggleTheme;

	const lightStyles = 'left-[3px]';
	const darkStyles = 'translate-x-[20px]';
</script>

<div
	class="w-5/6 py-3.5 gap-[23.6px] flex justify-center items-center rounded-md bg-lightBodyBg dark:bg-darkBodyBg"
>
	<SunIcon />
	<button on:click={toggleTheme} class="rounded-full w-[40px] h-[20px] p-[3px] bg-purple relative"
		><div
			class={`bg-white absolute left-[3px] w-[14px] h-[14px] top-[3px] rounded-full transition-all ${
				$data.theme === themeTypes.LIGHTTHEME ? lightStyles : darkStyles
			}`}
		/></button
	>
	<MoonIcon />
</div>
