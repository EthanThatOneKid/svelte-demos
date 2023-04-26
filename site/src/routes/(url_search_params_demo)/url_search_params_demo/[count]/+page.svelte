<script lang="ts">
	import { page } from '$app/stores';

	$: count = parseInt($page.params.count, 10);
</script>

<main>
	<h1>Count {count}</h1>

	Go next:<a href={`/url_search_params_demo/${count + 1}`}
		><code>/url_search_params_demo/{count + 1}</code></a
	>
</main>
