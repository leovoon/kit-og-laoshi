<script>
	import Checkbox from './Checkbox.svelte';

	export let checked = false;
</script>

<Checkbox name="cny" id="cny" label="新年气氛" bind:checked />
