import { parseQuery } from '$lib/parse';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge'
};

/** @type {import('./$types').PageServerLoad} */
export const load = ({ url, depends }) => {
	const { message, cny, selected, author, showAuthor } = parseQuery(url.searchParams);
	depends('home:generate');

	if (!message || !author) {
		return {
			message: cny ? '恭喜发财' : '你今天分享了吗？',
			cny,
			selected,
			author,
			showAuthor
		};
	}

	return {
		message,
		cny,
		selected,
		author
	};
};
