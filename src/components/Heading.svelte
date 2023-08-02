<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		level?: 1 | 2 | 3 | 4 | 5 | 6
	}

	export let level = 1
</script>

{#if level === 1}
	<h1 {...$$props}>
		<slot />
	</h1>
{:else if level === 2}
	<h2 {...$$props}>
		<slot />
	</h2>
{:else if level === 3}
	<h3 {...$$props}>
		<slot />
	</h3>
{:else if level === 4}
	<h4 {...$$props}>
		<slot />
	</h4>
{:else if level === 5}
	<h5 {...$$props}>
		<slot />
	</h5>
{:else if level === 6}
	<h6 {...$$props}>
		<slot />
	</h6>
{/if}
