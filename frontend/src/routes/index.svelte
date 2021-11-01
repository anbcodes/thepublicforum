<script lang="ts">
	import { api } from '../api';

	import { onMount } from 'svelte';

	let posts = [];

	onMount(async () => {
		let res = await api.get('/discussions?page=0');
		posts = res.data;
	})
</script>

{#each posts as post}
	<div>
		Title: {post.title}
		Description: {post.description}
	</div>
{/each}