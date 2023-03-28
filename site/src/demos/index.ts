import type { SvelteComponentTyped } from 'svelte';

export const DEMOS = Object.entries<{ default: SvelteComponentTyped<object> }>(
	import.meta.glob('./**/demo.svelte', { eager: true })
);
