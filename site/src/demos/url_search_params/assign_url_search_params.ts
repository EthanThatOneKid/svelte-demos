/**
 * assignURLSearchParams assigns the search params to the URL.
 *
 * Based on:
 * https://acmcsuf.com/code/blob/db6a7dafc5f95b33987396c666c95d3346fc0322/src/lib/server/links/resolve.ts
 */
export function assignURLSearchParams(url: URL, ...params: URLSearchParams[]): URL {
	const query = combineURLSearchParams(url.search, ...params);
	const hash = url.hash ? `#${url.hash}` : '';
	return new URL(`${url.origin}${url.pathname}${query}${hash}`);
}

function combineURLSearchParams(baseQuery: string, ...params: URLSearchParams[]): string {
	const baseQueryParams = new URLSearchParams(baseQuery);
	for (const entries of params) {
		for (const [key, value] of entries) {
			baseQueryParams.set(key, value);
		}
	}

	const query = baseQueryParams.toString();
	return query.length > 0 ? `?${query}` : '';
}
