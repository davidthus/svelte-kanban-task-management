<script>
	import Navbar from '$lib/navbar.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import '../app.css';
</script>

<Navbar />
<Sidebar />
<slot />
