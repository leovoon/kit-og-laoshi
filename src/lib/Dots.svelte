<script>
	import colors from 'nice-color-palettes';
	import seedrandom from 'seedrandom';

	export let count = 100;
	export let width = 750;
	export let height = 393;
	export let message = '你今天分享了吗？';
	export let satori = false;

	const rng = seedrandom(message);
	let palette = randomItem(colors);

	const bg = palette[palette.length - 1];
	palette = palette.slice(0, -1);

	const sizes = [0.3, 0.5, 0.8, 1.2, 4, 6];

	let points = new Array(count).fill(null).map(() => ({
		x: random(width, 0),
		y: random(height, 0),
		color: randomItem(palette),
		size: randomItem(sizes)
	}));

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
</script>

<div
	style="background-color: {bg}; max-width: {width}px; display: flex; position: relative;"
	style:height={satori ? `${height}px` : undefined}
>
	<div style="background-color: {bg}; width: 100%;" style:display={satori ? 'flex' : 'grid'}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" class:grid={!satori}>
			{#each points as { x, y, color, size }}
				<circle cx={x} cy={y} r={size} fill={color} />
			{/each}
		</svg>
		<p
			class="message"
			style:transform={satori ? `translateX(${width / 2}px) translateX(-50%);` : undefined}
			style:position={satori ? 'absolute' : undefined}
			style:font-size={satori ? '100px' : 'min(5vw, 50px)'}
			class:grid={!satori}
		>
			{message}
			<span class="signature" style:font-size={satori ? '24px' : 'min(3vw,30px)'}>by温老师</span>
		</p>
	</div>
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
		background-color: #868e9699;
		color: white;
		padding: 0.5em 1.5em;
		min-width: 100px;
		text-align: center;
	}
	.signature {
		z-index: 1;
		align-self: center;
		background-color: #8f8f8f99;
		color: white;
		padding: 0.2em 0.2em;
		min-width: 100px;
		text-align: center;
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>
