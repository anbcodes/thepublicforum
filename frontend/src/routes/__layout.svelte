<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import {extractJwt} from '../util';

	let loggedIn = false;
	let username = '';

	onMount(async () => {
		let token = localStorage.getItem('token');
		console.log(token);
		if (token) {
			loggedIn = true;
			let { payload } = await extractJwt(token);
			username = payload.username as string;
		}
	});

	const logout = () => {
		localStorage.removeItem('token');
		loggedIn = false;
		username = '';
	}

</script>

<header class="flex flex-row p-2 bg-slate-600 text-white">
	<div class="text-3xl">The Public Forum</div>
	<div class="flex-grow" />
	{#if !loggedIn}
		<div class="px-2"><a href="/login">Login</a></div>
		<div class="px-2"><a href="/register">Register</a></div>
	{:else}
		<div class="px-2 text-sm">
			Welcome back, {username}! <button on:click="{logout}">logout</button>
		</div>
	{/if}
</header>
<main class="flex-grow">
	<slot />
</main>
<footer class="bg-slate-600 text-white p-2 text-sm">Copyright © 2021 Anbcodes</footer>
