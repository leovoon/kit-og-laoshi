import { parseQuery } from '$lib/parse';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge',
};

/** @type {import('./$types').PageServerLoad} */
export const load = ({ url }) => {
	const { message } = parseQuery(url.searchParams);

	if (!message) {
		return {
			message: '你今天分享了吗？'
		};
	}

	return {
		message
	};
};
