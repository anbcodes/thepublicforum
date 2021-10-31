<script>
	import '../app.css';
</script>

<header class="flex flex-row p-2 bg-slate-600 text-white">
	<div class="text-3xl">The Public Forum</div>
	<div class="flex-grow" />
	<div class="px-2"><a href="/login">Login</a></div>
	<div class="px-2"><a href="/register">Register</a></div>
</header>
<main class="flex-grow">
	<slot />
</main>
<footer class="bg-slate-600 text-white p-2 text-sm">Copyright © 2021 Anbcodes</footer>
