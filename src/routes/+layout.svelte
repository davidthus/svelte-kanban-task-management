<script>
	import Navbar from '$lib/navbar.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import { onDestroy } from 'svelte';
	import '../app.css';
	import { ShowIcon } from '../assets';
	import { themeTypes } from '../constants/themeTypes';
	import { data, toggleSidebar } from '../stores/dataStore';

	const dataUnsubscribe = data.subscribe((value) => {
		console.log(value);
		if (value.theme === themeTypes.LIGHTTHEME) {
			document.documentElement.classList.remove('dark');
		} else if (value.theme === themeTypes.DARKTHEME) {
			document.documentElement.classList.add('dark');
		}
	});
	onDestroy(dataUnsubscribe);
</script>

<div class="w-screen h-screen z-[-1] fixed inset-0 bg-lightBodyBg dark:bg-darkBodyBg" />
<Navbar />
{#if $data.sidebarOpen}
	<Sidebar />
{:else}
	<div>
		<button
			class="absolute left-0 bottom-8 py-[19px] pl-[18px] pr-[22px] rounded-r-full bg-purple dark:hover:darkButtonPrimaryHover hover:bg-lightButtonPrimaryHover"
			on:click={toggleSidebar}
		>
			<ShowIcon />
		</button>
	</div>
{/if}
<slot />
