<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import Dots from '../lib/Dots.svelte';
	import { parseQuery } from '$lib/parse';
	import '../app.css';
	import { goto, invalidate } from '$app/navigation';
	import html2canvas from 'html2canvas';
	import ShareIcon from 'virtual:icons/material-symbols/share';
	import DownloadRounded from 'virtual:icons/material-symbols/download-rounded';
	import Close from 'virtual:icons/material-symbols/close';
	import { queryParameters, ssp } from 'sveltekit-search-params';

	/** @type {import("./$types").PageData} */
	export let data;

	let userInput = '';
	let authorInput = '';
	let element = null;
	let options = ['dragon', 'blossom', 'red-packet', 'coin', 'lantern', 'gold'];

	const qStore = queryParameters(
		{
			cny: ssp.boolean(false),
			selected: ssp.string('dragon')
		},
		{
			showDefaults: false,
			sorted: true
		}
	);

	$: ({ width, height } = parseQuery($page.url.searchParams));
	$: shareUrl = $page.url.origin + '/satori?message=' + data.message;
	$: title = `老师分享 - "${data.message}"`;
	$: description = '今天来点什么？ 生成一张温老师分享的文字吧！';
	function saveAsCanvas() {
		html2canvas(element).then((canvas) => {
			const a = document.createElement('a');
			a.href = canvas.toDataURL('image/png');
			a.download = 'laoshi-share.png';
			a.click();
		});
	}
</script>

<svelte:head>
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
{#key data}
	<Dots
		bind:element
		message={data.message}
		{width}
		{height}
		cny={data.cny}
		selected={data.selected}
		author={data.author}
		bind:authorUpdate={$qStore.author}
	/>
{/key}
<div style="display: grid; place-items: center;">
	<div style="display: inline-flex; align-items: center; gap: .5rem; ">
		<input
			style="width: 30px;"
			type="checkbox"
			id="cny"
			name="cny"
			bind:checked={$qStore.cny}
			on:change={() => {}}
		/>
		<label style="font-size: 1.5rem;" for="cny"> cny</label><br />
	</div>

	{#if $qStore.cny}
		<div style="display: flex;  justify-content: center; align-items: center; gap: .2rem">
			{#each options as value}
				<label
					><input
						style="width: 20px; height: 20px; "
						type="radio"
						{value}
						bind:group={$qStore.selected}
					/>
					{value}</label
				>
			{/each}
		</div>
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
	感谢开源让我知道怎么做这个网站
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

	a button {
		background-color: rgb(84, 57, 148);
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
</style>
