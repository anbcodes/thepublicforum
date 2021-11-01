<script lang="ts">
	import { api } from '../api';

	let password = '';
	let username = '';
	let error = '';

	let login = async () => {
		let res = await api.post('/login', {
			username,
			password
		});
		let jwt = res.data?.jwt;
		if (jwt) {
			localStorage.setItem('token', jwt);
			let params = new URLSearchParams(window.location.search);
			window.location.pathname = params.get('to') || '/';
		} else {
			error = res.data;
		}
	};
</script>

<div class="flex flex-row justify-center">
	<div>
		<div class="m-2">
			Username: <input
				class="border-2 rounded border-slate-500"
				type="text"
				bind:value={username}
			/>
		</div>
		<div class="m-2">
			Password: <input
				class="border-2 rounded border-slate-500"
				type="password"
				bind:value={password}
			/>
		</div>
		<button class="m-2 border-2 rounded-lg border-slate-500 p-1" on:click={login}
			>Login</button
		>
		<div class="m-3 text-red-600">{error}</div>
	</div>
</div>
