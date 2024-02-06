import Image from '../../lib/Dots.svelte';
import { parseQuery } from '$lib/parse';
import { componentToPng } from '$lib/renderImage';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const query = url.searchParams;
	const { message, author, width, height, selected, cny, showAuthor } = parseQuery(query);
	return componentToPng(
		Image,
		{ message, author, cny, selected, width, height, showAuthor, satori: true },
		height,
		width
	);
};
