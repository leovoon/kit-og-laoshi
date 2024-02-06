<script>
	import colors from 'nice-color-palettes';
	import seedrandom from 'seedrandom';
	import NewYearSpriteGroupPath from './NewYearSpriteGroupPath.svelte';
	import { queryParameters, ssp } from 'sveltekit-search-params';
	import Checkbox from './Checkbox.svelte';

	export let count = 20;
	export let width = 1200;
	export let height = 675;
	export let message = '你今天分享了吗？';
	export let author = 'by温老师';
	export let authorUpdate = author;
	export let satori = false;
	export let element;
	export let cny = false;
	export let selected = '';
	export let showAuthor = true;

	const chineseNewYearPalette = ['#4d6c31', '#70994D', '#F6EB5D', '#FEB954', '#F7484D']; // RGB codes for red, yellow, and green
	const cnyPalette = chineseNewYearPalette.slice(0, -1);
	const cnyBg = chineseNewYearPalette[chineseNewYearPalette.length - 1];
	let rng = seedrandom(message);
	let palette = randomItem(colors);

	const bg = palette[palette.length - 1];
	palette = palette.slice(0, -1);
	const sizes = [0.3, 0.5, 0.8, 1.2, 4, 6];

	/**
	 * @param {number} upper
	 * @param {number} lower
	 */
	function random(upper, lower) {
		const result = rng() * (upper - lower) + lower;
		return result;
	}

	/**
	 * @param {any[]} arr
	 */
	function randomItem(arr) {
		const idx = Math.floor(random(arr.length, 0));
		return arr[idx];
	}

	function parseSpacetoNextLine(str = '') {
		// parse space, comma, period to next line, chinese comma
		// const parsed = str.replace(/ |,|。|，/g, '\n');

		// append \n behind space, comma, period to next line, chinese comma including space
		// const parsed = str.replace(/(?= |,|。|，)/g, '\n');

		// append exclude space
		const parsed = str.replace(/(?=,|。|，)/g, '\n');

		const convertedHtml = parsed.replace(/\n/g, '<br />');
		return convertedHtml;
	}

	$: parseSpacetoNextLine(message), message;

	$: points = new Array(count).fill(null).map(() => ({
		x: random(width, 0),
		y: random(height, 0),
		color: cny ? randomItem(cnyPalette) : randomItem(palette),
		size: randomItem(sizes)
	}));
</script>

<div
	bind:this={element}
	style="background-color: {bg}; max-width: {width}px; display: flex; position: relative;"
	style:height={satori ? `${height}px` : undefined}
>
	<div
		style="background-color: {cny ? cnyBg : bg}; width: 100%;"
		style:display={satori ? 'flex' : 'grid'}
	>
		{#if cny}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" class:grid={!satori}>
				{#each points as { x, y, color }, index}
					<!-- <NewYearSpriteGroupPath {color} {x} {y} scale="1" {selected} /> -->
					<NewYearSpriteGroupPath {color} {x} {y} {selected} />
				{/each}
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" class:grid={!satori}>
				{#each points as { x, y, color, size }, index}
					<circle cx={x} cy={y} r={size} fill={color} />
				{/each}
			</svg>
		{/if}
		<p
			class="message"
			style:background-color={cny ? '' : '#868e9699'}
			style:text-shadow={cny ? '2px 2px 5px black' : ''}
			style:transform={satori ? `translateX(${width / 2}px) translateX(-50%);` : undefined}
			style:position={satori ? 'absolute' : undefined}
			style:font-size={satori ? '50px' : 'min(5vw, 50px)'}
			class:grid={!satori}
			style:width={satori ? '100%' : undefined}
			style:padding={satori ? '0.4em' : 'clamp(0.4em, 2vw, 1em)'}
		>
			{#if satori}
				{message}
			{:else}
				{@html parseSpacetoNextLine(message)}
			{/if}
		</p>
	</div>
	<span
		style:display={showAuthor ? 'block' : 'none'}
		class="signature"
		contenteditable="true"
		bind:innerText={authorUpdate}
		on:blur
		style:font-size={satori ? '32px' : 'min(3vw,30px)'}>{author}</span
	>
</div>

<style>
	.grid {
		justify-self: center;
		align-self: center;
		grid-column: 1;
		grid-row: 1;
	}

	.message {
		z-index: 1;
		align-self: center;
		color: white;
		min-width: 100px;
		text-align: center;
		max-width: 90%;
		line-height: 1.2;
	}

	.signature {
		z-index: 1;
		align-self: center;
		background-color: #8f8f8f99;
		color: rgba(255, 255, 255, 0.959);
		padding: 0.2em;
		min-width: 50px;
		text-align: center;
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>
