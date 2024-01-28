import { parseQuery } from '$lib/parse';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge'
};

/** @type {import('./$types').PageServerLoad} */
export const load = ({ url, depends }) => {
	const { message, cny, selected } = parseQuery(url.searchParams);
	depends('home:generate');

	if (!message) {
		return {
			message: cny ? '恭喜发财' : '你今天分享了吗？',
			cny,
			selected
		};
	}

	return {
		message,
		cny,
		selected
	};
};
