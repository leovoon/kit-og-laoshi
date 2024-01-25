<script>
	import { page } from '$app/stores';
	import Image from '../lib/Dots.svelte';
	import { parseQuery } from '$lib/parse';
	import '../app.css';
	import { goto } from '$app/navigation';

	/** @type {import("./$types").PageData} */
	export let data;

	let userInput = '';
	$: ({ width, height } = parseQuery($page.url.searchParams));
	$: shareUrl = $page.url.origin + '/satori?message=' + data.message;
	$: title = `老师分享 - "${data.message}"`;
	$: description = '今天来点什么？ 生成一张温老师分享的文字吧！';
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
{#key data.message}
	<Image message={data.message} {width} {height} />
{/key}
<form
	action="/"
	style="text-align: center;"
	on:submit|preventDefault={(e) => {
		const data = new FormData(e.target);
		const searchParams = new URLSearchParams(data);
		goto(`/?${searchParams.toString()}`, { keepfocus: true, noscroll: true });
	}}
>
	<input type="text" placeholder="写点什么" name="message" bind:value={userInput} />
	<button>生成</button>
</form>
<p class="share">
	<button
		style="		background-color: var(--primary);
	"
		on:click={async () => {
			const shareData = {
				title: title,
				text: description,
				url: $page.url.toString()
			};
			try {
				await navigator.share(shareData);
			} catch (err) {
				alert('分享失败, 换个手机吧');
			}
		}}>分享</button
	>
</p>
<a href={shareUrl} download="laoshi-share.png">
	<button> 保存图片 </button>
</a>

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

	input {
		width: 80%;
		max-width: 30ch;
		height: 3rem;
		padding: 0 1rem;
		margin-block: 1.5rem;
		background-color: var(--background);
		color: var(--text);
		font-size: 1.5rem;
		border-radius: 8px;
		font-family: inherit;
	}

	.share {
		text-align: center;
	}
</style>
