<script>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck

	import { DEMOS } from '../demos';
</script>

<h1>Svelte demos</h1>

<!-- TODO: Convert into CSS grid of DEMOS. -->
{#each DEMOS as [name, { default: component }]}
	<h2><code>{name}</code></h2>

	<div class="demo">
		<svelte:component this={component} />
	</div>
{/each}

<style>
	h1 {
		text-align: center;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.demo {
		outline: 1px solid #ccc;
		width: min-content;
		height: min-content;
	}
</style>
