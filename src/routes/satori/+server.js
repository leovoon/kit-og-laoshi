import Image from '../../lib/Dots.svelte';
import { parseQuery } from '$lib/parse';
import { componentToPng } from '$lib/renderImage';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const query = url.searchParams;
	const { message, width, height, selected, cny } = parseQuery(query);
	return componentToPng(
		Image,
		{ message, cny, selected, width, height, satori: true },
		height,
		width
	);
};
