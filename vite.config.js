import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		port: 3000
	},
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	]
};

export default config;
