<script>
	import { onMount } from 'svelte';
	import SOURCE_CODE from './persistable?raw';
	import { demo } from './demo';

	let count = 0;

	$: $demo.favoriteNumber = count > $demo.favoriteNumber ? count : $demo.favoriteNumber;

	onMount(() => {
		demo.sync();
	});
</script>

<pre><code>{JSON.stringify($demo, null, 2)}</code></pre>

<button on:click={() => ++count}>{count}</button>

<details>
	<summary>Source Code</summary>
	<hr />

	<pre><code>{SOURCE_CODE}</code></pre>
</details>
