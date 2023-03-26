<script>
	import Navbar from '$lib/navbar.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import { onDestroy } from 'svelte';
	import '../app.css';
	import { themeTypes } from '../constants/themeTypes';
	import { data } from '../stores/dataStore';

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
<Sidebar />
<slot />
