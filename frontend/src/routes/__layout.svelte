<script>
	import { onMount } from 'svelte';
	import { jwtVerify } from 'jose';
	import '../app.css';

	let loggedIn = false;
	let username = '';

	onMount(() => {
		let token = localStorage.getItem('token');
		console.log(token);
		if (token) {
			loggedIn = true;
			let { payload } = jwtVerify(token);
		}
	});
</script>

<header class="flex flex-row p-2 bg-slate-600 text-white">
	<div class="text-3xl">The Public Forum</div>
	<div class="flex-grow" />
	{#if !loggedIn}
		<div class="px-2"><a href="/login">Login</a></div>
		<div class="px-2"><a href="/register">Register</a></div>
	{:else}
		<div class="px-2">
			Welcome back, {username}!
		</div>
	{/if}
</header>
<main class="flex-grow">
	<slot />
</main>
<footer class="bg-slate-600 text-white p-2 text-sm">Copyright © 2021 Anbcodes</footer>
