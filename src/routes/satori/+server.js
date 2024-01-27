import Image from '../../lib/Dots.svelte';
import { parseQuery } from '$lib/parse';
import { componentToPng } from '$lib/renderImage';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge'
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const query = url.searchParams;
	const { message, width, height } = parseQuery(query);
	return componentToPng(Image, { message, width, height, satori: true }, height, width);
};
