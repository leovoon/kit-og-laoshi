<script>
	import colors from 'nice-color-palettes';
	import seedrandom from 'seedrandom';
	import NewYearSpriteGroupPath from './NewYearSpriteGroupPath.svelte';

	export let count = 100;
	export let width = 750;
	export let height = 393;
	export let message = '你今天分享了吗？';
	export let author = '温老师';
	export let satori = false;
	export let element;
	export let cny = false;
	export let selected = '';

	const rng = seedrandom(message);
	let palette = randomItem(colors);

	const chineseNewYearPalette = ['#4d6c31', '#70994D', '#F6EB5D', '#FEB954', '#F7484D']; // RGB codes for red, yellow, and green
	let cnyPalette = chineseNewYearPalette.slice(0, -1);
	const cnyBg = chineseNewYearPalette[chineseNewYearPalette.length - 1];

	const bg = palette[palette.length - 1];
	palette = palette.slice(0, -1);
	count = cny ? 20 : count;
	const sizes = [0.3, 0.5, 0.8, 1.2, 4, 6];

	let points = new Array(count).fill(null).map(() => ({
		x: random(width, 0),
		y: random(height, 0),
		color: cny ? randomItem(cnyPalette) : randomItem(palette),
		size: randomItem(sizes)
	}));

	/**
	 * @param {{ left: any; right: any; top: any; bottom: any; }} rect1
	 * @param {{ left: any; right: any; top: any; bottom: any; }} rect2
	 */
	function intersects(rect1, rect2) {
		return (
			rect1.left <= rect2.right &&
			rect1.right >= rect2.left &&
			rect1.top <= rect2.bottom &&
			rect1.bottom >= rect2.top
		);
	}

	$: noOverlapPoints = points.map((point) => {
		const rect1 = {
			left: point.x - point.size,
			right: point.x + point.size,
			top: point.y - point.size,
			bottom: point.y + point.size
		};
		const overlap = points.filter((p) => {
			const rect2 = {
				left: p.x - p.size,
				right: p.x + p.size,
				top: p.y - p.size,
				bottom: p.y + p.size
			};
			return intersects(rect1, rect2);
		});
		if (overlap.length > 1) {
			const newPoint = {
				x: random(width, 0),
				y: random(height, 0),
				color: cny ? randomItem(cnyPalette) : randomItem(palette),
				size: randomItem(sizes)
			};
			return newPoint;
		} else {
			return point;
		}
	});

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
		const parsed = str.replace(/ |,|。|，/g, '\n');

		const convertedHtml = parsed.replace(/\n/g, '<br />');
		return convertedHtml;
	}
	$: parseSpacetoNextLine(message), message;
	$: console.log(cny);
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
				{#each noOverlapPoints as { x, y, color, size }, index}
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
	<span class="signature" style:font-size={satori ? '32px' : 'min(3vw,30px)'}>by{author}</span>
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
		min-width: 100px;
		text-align: center;
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>
