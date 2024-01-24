import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { read } from '$app/server';

import hanyiSentyRubber from '$lib/fonts/HanyiSentyRubber.ttf';
const fontData = read(hanyiSentyRubber).arrayBuffer();

/**
 * @param {typeof import("./Dots.svelte").default} component
 * @param {{ width: number; height: number; satori: boolean; message?: string | undefined; }} props
 * @param {number} height
 * @param {number} width
 */
export async function componentToPng(component, props, height, width) {
	// @ts-ignore
	const result = component.render(props);
	const markup = toReactNode(`${result.html}<style>${result.css.code}</style>`);
	// @ts-ignore
	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Source Serif Pro',
				data: await fontData,
				style: 'normal'
			}
		],
		height: +height,
		width: +width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: +width
		}
	});

	const png = resvg.render();

	return new Response(png.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
}
