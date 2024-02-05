<script>
	import colors from 'nice-color-palettes';
	import seedrandom from 'seedrandom';
	import NewYearSpriteGroupPath from './NewYearSpriteGroupPath.svelte';
	import { queryParameters, ssp } from 'sveltekit-search-params';

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

	let activeRatio = '16:9';

	const qStore = queryParameters(
		{
			count: ssp.number(count),
			width: ssp.number(width),
			height: ssp.number(height)
		},
		{
			showDefaults: false,
			pushHistory: false,
			sort: true
		}
	);
	const chineseNewYearPalette = ['#4d6c31', '#70994D', '#F6EB5D', '#FEB954', '#F7484D']; // RGB codes for red, yellow, and green
	const cnyPalette = chineseNewYearPalette.slice(0, -1);
	const cnyBg = chineseNewYearPalette[chineseNewYearPalette.length - 1];
	let rng = seedrandom(message);
	let palette = randomItem(colors);

	const bg = palette[palette.length - 1];
	palette = palette.slice(0, -1);
	const sizes = [0.3, 0.5, 0.8, 1.2, 4, 6];
	const ratios = [
		{
			width: 1200,
			height: 900,
			ratio: '4:3'
		},
		{
			width: 675,
			height: 675,
			ratio: '1:1'
		},
		{
			width: 1200,
			height: 800,
			ratio: '3:2'
		},
		{
			width: 1200,
			height: 675,
			ratio: '16:9'
		}
	];

	/**
	 * @param {number} width
	 * @param {number} height
	 * @param {string} ratio
	 */
	function setAspectRatio(width, height, ratio) {
		$qStore.width = width;
		$qStore.height = height;
		activeRatio = ratio;
	}

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
	$: width = $qStore.width;
	$: height = $qStore.height;
	$: points = new Array($qStore.count).fill(null).map(() => ({
		x: random(width, 0),
		y: random(height, 0),
		color: cny ? randomItem(cnyPalette) : randomItem(palette),
		size: randomItem(sizes)
	}));
</script>

<div class="slider">
	{$qStore.count}
	<input type="range" min="1" max="100" bind:value={$qStore.count} />
</div>
<div style="display: flex; gap: .2rem; padding-block: .2rem; ">
	{#each ratios as { width, height, ratio }}
		<button
			style={'color: var(--primary); border: 1px solid var(--primary); cursor: pointer;' +
				(activeRatio === ratio ? 'color: white' : '')}
			style:background-color={activeRatio === ratio ? 'var(--highlight)' : 'var(--background)'}
			on:click={() => {
				setAspectRatio(width, height, ratio);
			}}
		>
			{ratio}
		</button>
	{/each}
</div>
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

	.slider {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	input[type='range'] {
		height: 20px;
		-webkit-appearance: none;
		appearance: none;
		background-color: var(--background);
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 8px;
		cursor: pointer;
		background: var(--primary);
		border-radius: 5px;
	}
	input[type='range']::-webkit-slider-thumb {
		height: 20px;
		width: 20px;
		border-radius: 5px;
		background: var(--highlight);
		margin-top: -5px;
		cursor: pointer;
		-webkit-appearance: none;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: var(--primary);
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 12px;
		cursor: pointer;
		background: var(--highlight);
		border-radius: 4px;
		border: 2px solid #f27b7f;
	}
	input[type='range']::-moz-range-thumb {
		border: 2px solid #f27b7f;
		height: 30px;
		width: 30px;
		border-radius: 0px;
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 10px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: var(--secondary);
		border: 2px solid #f27b7f;
		border-radius: 8px;
	}
	input[type='range']::-ms-fill-upper {
		background: #ff96ab;
		border: 2px solid #f27b7f;
		border-radius: 8px;
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
		border: 2px solid #f27b7f;
		height: 30px;
		width: 30px;
		border-radius: 0px;
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: #ff96ab;
	}
	input[type='range']:focus::-ms-fill-upper {
		background: #ff96ab;
	}
</style>
