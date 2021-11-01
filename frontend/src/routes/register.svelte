<script lang="ts">
	import { api } from '../api';

	let password = '';
	let passwordConfirm = '';
	let username = '';
	let error = '';

	const isValidUsername = (name: string) =>
		name !== '' && name.length < 50 && /^[0-9A-Za-z_]+$/.test(name);
	const isValidPassword = (pwd: string) =>
		pwd !== '' && pwd.length > 10 && pwd.length < 50 && /^[ -~]+$/.test(pwd);

	let register = async () => {
		if (password !== passwordConfirm) {
			error = 'Passwords must match!';
			return;
		}

		if (!isValidUsername(username)) {
			error =
				'The username must be less then 50 characters and can only contain 0-9 A-z and underscore';
			return;
		}

		if (!isValidPassword(password)) {
			error = 'The password must be greater then 10 characters and less then 50 characters';
			return;
		}

		let res = await api.post('/register', {
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
		<div class="m-2">
			Confirm Password: <input
				class="border-2 rounded border-slate-500"
				type="password"
				bind:value={passwordConfirm}
			/>
		</div>
		<button class="m-2 border-2 rounded-lg border-slate-500 p-1" on:click={register}
			>Create Account</button
		>
		<div class="m-3 text-red-600">{error}</div>
	</div>
</div>
