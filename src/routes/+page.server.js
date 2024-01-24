import { parseQuery } from '$lib/parse';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = ({ url }) => {
	const { message } = parseQuery(url.searchParams);

	if (!message) {
		return { message: '你今天分享了吗？' };
	}

	return {
		message
	};
};
