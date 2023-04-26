<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import {
		DEMO_SEARCH_PARAMS,
		makeHandleURLSearchParamsAfterNavigate
	} from '../../demos/url_search_params/demo';

	afterNavigate((event) => {
		const handle = makeHandleURLSearchParamsAfterNavigate(DEMO_SEARCH_PARAMS);
		handle(event);
	});
</script>

<slot />
