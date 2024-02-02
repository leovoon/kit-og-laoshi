<script>
	export let checked = false;
</script>

<label
	style="display: inline-flex; align-items: center; gap: .5rem; "
	style:color={checked ? 'var(--highlight)' : 'var(--primary)'}
>
	<input
		style="width: 30px;"
		class="cny-checkbox"
		type="checkbox"
		id="cny"
		name="cny"
		bind:checked
	/>
	<svg
		class="tick"
		width="40"
		height="40"
		viewBox="0 0 1024 1024"
		xmlns="http://www.w3.org/2000/svg"
		><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" /></svg
	>
	新年气氛
</label>

<style>
	label {
		display: inline-flex;
		margin-block: 1rem;
		align-items: center;
		gap: 0.5rem;
		color: var(--primary);
		cursor: pointer;
	}
	.cny-checkbox {
		appearance: none;
		width: 2em;
		height: 2em;
		border-radius: 5px;
		display: inline-block;
		background-color: var(--primary);
	}

	.cny-checkbox:checked {
		background: var(--highlight);
	}
	.tick {
		opacity: 0;
		position: absolute;
		transition: opacity 0.3s ease-out;
	}
	.cny-checkbox:checked + .tick {
		display: block;
		opacity: 1;
		fill: var(--background);
	}
</style>
