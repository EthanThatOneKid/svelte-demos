import type { AfterNavigate } from '@sveltejs/kit';
import { assignURLSearchParams } from './assign_url_search_params';

/**
 * makeHandleURLSearchParamsAfterNavigate returns an AfterNavigate handler.
 *
 * TODO: Hook up to KV to share state between tabs, but this should not be default behavior.
 */
export function makeHandleURLSearchParamsAfterNavigate(params: Set<string>): HandleAfterNavigate {
	return async (event) => {
		if (!event.to) {
			return;
		}

		// TODO: const destination = assignURLSearchParams();
		console.log({ event });
	};
}

/**
 * resolveURLSearchParams returns a new URLSearchParams object with the base search
 * params overridden by the provided search params.
 *
 * params are only overridden if they are in the allowList.
 */
export function resolveURLSearchParams(
	base: URLSearchParams | undefined,
	params: URLSearchParams | undefined,
	allowList: Set<string>
): URLSearchParams {
	const result = new URLSearchParams(base);
	if (!params) {
		return result;
	}

	for (const [key, value] of params.entries()) {
		if (!allowList.has(key)) {
			continue;
		}

		result.set(key, value);
	}

	return result;
}

/**
 * HandleAfterNavigate is an AfterNavigate handler.
 */
export type HandleAfterNavigate = (event: AfterNavigate) => void;

function noop(..._: unknown[]): void {
	return;
}

/**
 * DemoSearchParams is the type of the search params object used in this demo.
 */
export interface DemoSearchParams {
	foo: string;
	bar: number;
}

/**
 * DEMO_SEARCH_PARAMS is the set of search params used in this demo.
 */
export const DEMO_SEARCH_PARAMS = new Set([
	'foo',
	'bar'
] as const satisfies readonly (keyof DemoSearchParams)[]);
