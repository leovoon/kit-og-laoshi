<script>
	export let checked = false;
	export let label = 'Checkbox';
	export let name = 'checkbox';
	export let id = 'checkboxId';

	/**
	 * @type {'normal' | 'small'}
	 */
	export let variant = 'normal';
</script>

<label
	style="display: inline-flex; align-items: center; justify-content:center; gap: .5rem; position: relative;"
	style:color={checked ? 'var(--highlight)' : 'var(--primary)'}
>
	<input
		style:width={variant === 'small' ? '1rem' : '1.5rem'}
		style:height={variant === 'small' ? '1rem' : '1.5rem'}
		class="checkbox"
		type="checkbox"
		{id}
		{name}
		bind:checked
	/>
	<svg
		class="tick"
		style:inset={variant === 'small' ? '4px' : '0'}
		width={variant === 'small' ? '20' : '35'}
		height={variant === 'small' ? '20' : '35'}
		viewBox="0 0 1024 1024"
		xmlns="http://www.w3.org/2000/svg"
		><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" /></svg
	>
	{label}
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
	.checkbox {
		appearance: none;
		border-radius: 5px;
		display: inline-block;
		background-color: var(--primary);
	}

	.checkbox:checked {
		background: var(--highlight);
	}
	.tick {
		opacity: 0;
		position: absolute;
		transition: opacity 0.3s ease-out;
	}
	.checkbox:checked + .tick {
		display: block;
		opacity: 1;
		fill: var(--background);
	}
</style>
