<script>
	import Navbar from '$lib/navbar.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import { onDestroy } from 'svelte';
	import '../app.css';
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

<Navbar />
{#if $data.sidebarOpen}
	<Sidebar />
{:else}
	<div>
		<button on:click={toggleSidebar}>Show Sidebar</button>
	</div>
{/if}
<slot />
