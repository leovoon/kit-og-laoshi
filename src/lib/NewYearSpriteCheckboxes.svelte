<script>
	import { fade } from 'svelte/transition';

	/**
	 * @type {string}
	 */
	export let group = '';

	/**
	 * @typedef {Object} Option
	 * @property {string} value
	 * @property {any} component
	 */
	/**
	 * @type {Option[]}
	 */
	export let options;
</script>

<div
	transition:fade={{ duration: 150 }}
	style="display: flex;  justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap;"
>
	{#each options as { value, component }}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div tabindex="0">
			<label
				><input style="width: 100%; height: inherit;" type="radio" {value} bind:group />

				<span>
					<svelte:component this={component} width="50" height="50" />
				</span>
			</label>
		</div>
	{/each}
</div>

<style>
	label {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: clamp(20px, 9vw, 50px);
		height: clamp(20px, 9vw, 50px);
	}
	label span {
		position: absolute;
		inset: 0;
	}

	label span :global(svg) {
		width: clamp(20px, 9vw, 50px);
		height: clamp(20px, 9vw, 50px);
	}
	input[type='radio'] {
		appearance: none;
	}
	input[type='radio']::before {
		content: '';
		display: block;
		width: clamp(20px, 9vw, 50px);

		height: clamp(20px, 9vw, 50px);
		border-radius: 50%;
		border: 2px solid transparent;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		transition:
			border-width 0.2s ease-in-out,
			transform 0.2s ease-in-out;
		transform-origin: center;
		transform: scale(1);
	}

	label:hover {
		cursor: pointer;
	}

	input[type='radio']:hover::before {
		border-color: var(--highlight);
		border-width: 4px;
		transform: scale(1.2);
	}

	input[type='radio']:checked::before {
		background-color: var(--highlight);
	}
</style>
