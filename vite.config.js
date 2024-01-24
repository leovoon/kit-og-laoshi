import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		port: 3000
	},
	plugins: [sveltekit()]
};

export default config;
