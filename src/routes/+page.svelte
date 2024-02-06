<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import Dots from '../lib/Dots.svelte';
	import '../app.css';
	import html2canvas from 'html2canvas';
	import ShareIcon from 'virtual:icons/material-symbols/share';
	import DownloadRounded from 'virtual:icons/material-symbols/download-rounded';
	import Close from 'virtual:icons/material-symbols/close';
	import { queryParameters, ssp } from 'sveltekit-search-params';
	import NewYearSpriteCheckboxes from '../lib/NewYearSpriteCheckboxes.svelte';
	import HanyiSentyRubber from '../lib/fonts/HanyiSentyRubber.woff';
	import Coin from '../lib/svgs/Coin.svelte';
	import RedPacket from '../lib/svgs/RedPacket.svelte';
	import Lantern from '../lib/svgs/Lantern.svelte';
	import Gold from '../lib/svgs/Gold.svelte';
	import Dragon from '../lib/svgs/Dragon.svelte';
	import Blossom from '../lib/svgs/Blossom.svelte';
	import NewYearTriggerCheckbox from '$lib/NewYearTriggerCheckbox.svelte';
	import Checkbox from '$lib/Checkbox.svelte';

	/** @type {import("./$types").PageData} */
	export let data;

	let userInput = '';
	let authorInput = data.author;
	let element = null;
	let activeRatio = '16:9';
	let options = [
		{ value: 'dragon', component: Dragon },
		{ value: 'blossom', component: Blossom },
		{ value: 'red-packet', component: RedPacket },
		{ value: 'coin', component: Coin },
		{ value: 'lantern', component: Lantern },
		{ value: 'gold', component: Gold }
	];

	const qStore = queryParameters(
		{
			cny: ssp.boolean(false),
			selected: ssp.string('dragon'),
			author: ssp.string('by温老师'),
			width: ssp.number(1200),
			height: ssp.number(675),
			count: ssp.number(30),
			showAuthor: ssp.boolean(true)
		},
		{
			showDefaults: false,
			sorted: true,
			pushHistory: false
		}
	);

	$: shareUrl = $page.url.origin + '/satori?message=' + data.message;
	$: title = `老师分享 - "${data.message}"`;
	$: description = '今天来点什么？ 生成一张温老师分享的文字吧！';
	function saveAsCanvas() {
		html2canvas(element, {
			y: -0.2
		}).then((canvas) => {
			const a = document.createElement('a');
			a.href = canvas.toDataURL('image/png');
			a.download = 'laoshi-share.png';
			a.click();
		});
	}

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
</script>

<svelte:head>
	<link rel="preload" href={HanyiSentyRubber} as="font" crossOrigin="anonymous" />

	<title>{title}</title><meta content="summary_large_image" name="twitter:card" /><meta
		content={title}
		property="og:site_name"
	/><meta content={title} property="og:title" /><meta
		content={$page.url.origin}
		property="og:url"
	/><meta content={description} name="description" /><meta
		content={description}
		property="og:description"
	/><meta content={shareUrl} property="og:image" /></svelte:head
>

<h1>老师爱分享</h1>

<div style="display: flex; justify-content: space-between; align-items: end; ">
	<div style="display: flex; gap: .2rem; padding-block: .2rem; ">
		{#each ratios as { width: w, height: h, ratio }}
			<button
				style={'color: var(--primary); border: 1px solid var(--primary); cursor: pointer; font-size: clamp(12px, 2vw, 14px); height: 25px;' +
					(activeRatio === ratio ? 'color: white' : '')}
				style:background-color={activeRatio === ratio ? 'var(--highlight)' : 'var(--background)'}
				on:click={() => {
					setAspectRatio(w, h, ratio);
				}}
			>
				{ratio}
			</button>
		{/each}
	</div>
	<div style="display: flex; flex-direction: column; align-items: end;">
		<div style="font-size: 12px;">
			<Checkbox
				variant="small"
				name="showAuthor"
				label={`${$qStore.showAuthor ? '显示' : '隐藏'}作者`}
				id="showAuthor"
				bind:checked={$qStore.showAuthor}
			/>
		</div>
		<div class="slider">
			{$qStore.count}
			<input type="range" min="1" max="100" bind:value={$qStore.count} />
		</div>
	</div>
</div>

{#key (data, $qStore)}
	<Dots
		bind:element
		message={data.message}
		width={$qStore.width}
		height={$qStore.height}
		count={$qStore.count}
		cny={data.cny}
		showAuthor={$qStore.showAuthor}
		selected={data.selected}
		author={data.author}
		bind:authorUpdate={authorInput}
		on:blur={() => {
			$qStore.author = authorInput;
		}}
	/>
{/key}
<div style="display: flex; flex-direction:column; justify-content:center; align-items:center; ">
	<NewYearTriggerCheckbox bind:checked={$qStore.cny} />

	{#if $qStore.cny}
		<NewYearSpriteCheckboxes {options} bind:group={$qStore.selected} />
	{/if}
</div>

<form
	action="/"
	style="text-align: center; "
	on:submit|preventDefault={(e) => {
		$qStore.message = userInput;
	}}
>
	<div style="position:relative;">
		<input type="text" placeholder="写点什么" name="message" bind:value={userInput} />
		{#if userInput}
			<button class="x" type="button" on:click={() => (userInput = '')}>
				<Close />
			</button>
		{/if}
	</div>
	<button type="submit">生成</button>
</form>

<p class="menu">
	<button
		style:background-color={'var(--primary)'}
		style="display: flex; align-items: center; justify-content: center;"
		on:click={async () => {
			const shareData = {
				title: title,
				text: description,
				url: $page.url.toString()
			};
			await navigator.share(shareData);
		}}
	>
		<ShareIcon />
	</button>
	{#if $page.url.searchParams.has('message')}
		<button on:click={saveAsCanvas} class="download"> <DownloadRounded /> </button>
		<!-- <a href={shareUrl} download="laoshi-share-og.png">
			<button> 保存OG图片 </button>
		</a> -->
	{/if}
</p>

<footer style="text-align: center;opacity: 30%; margin-top: 3rem; font-size: smaller;">
	Built using <a href="https://kit.svelte.dev/">SvelteKit</a> and
	<a href="https://github.com/vercel/satori/tree/main">satori</a> by
	<a href="https://leovoon.github.io">leovoon</a> hosted on Vercel
</footer>

<style>
	button {
		width: 100%;
		max-width: 30ch;
		height: 3rem;
		margin: 1rem auto;
		background-color: var(--highlight);
		color: white;
		font-size: 1.5rem;
		border: none;
		border-radius: 8px;
		font-family: inherit;
		cursor: pointer;
		transition: scale 0.3s ease-out;
		display: block;
	}

	button:active {
		transform: scale(0.95);
	}

	a {
		text-decoration: none;
	}

	button.x {
		position: absolute;
		width: 3rem;
		height: 3rem;
		top: 0;
		right: 0;
		border-bottom-right-radius: 8px;
		border-top-right-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		transform: translateY(50%);
	}

	.download {
		background-color: rgb(148, 57, 133);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}

	input {
		width: 100%;
		height: 3rem;
		padding: 0 1rem;
		resize: vertical;
		box-sizing: border-box;
		padding-right: 3.5rem;
		margin-block: 1.5rem;
		background-color: var(--background);
		color: var(--text);
		font-size: 1.5rem;
		border-radius: 8px;
		font-family: inherit;
	}

	.menu {
		text-align: center;
		justify-content: center;
		max-width: 45ch;
		margin: 0 auto;
		display: flex;
		gap: 1rem;
	}

	.slider {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	input[type='range'] {
		height: 20px;
		padding: 0;
		width: clamp(60px, 12vw, 100%);
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
