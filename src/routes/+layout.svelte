<script>
	import Navbar from '$lib/navbar.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import '../app.css';
	import { themeTypes } from '../constants/themeTypes';
	import { data } from '../stores/dataStore';

	data.subscribe((value) => {
		console.log(value);
		if (value.theme === themeTypes.LIGHTTHEME) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<Navbar />
<Sidebar />
<slot />
