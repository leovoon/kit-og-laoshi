const HEIGHT = 675;
const WIDTH = 1200;

/**
 *
 * @param {URLSearchParams} query
 */
export function parseQuery(query) {
	const message = query.get('message') ?? undefined;
	const cny = JSON.parse(query.get('cny') ?? 'false') ?? undefined;
	const selected = query.get('selected') ?? undefined;
	const author = query.get('author') ?? undefined;
	const width = query.get('w') ?? WIDTH;
	const height = query.get('h') ?? HEIGHT;
	return { message, width: +width, height: +height, cny, selected, author };
}
