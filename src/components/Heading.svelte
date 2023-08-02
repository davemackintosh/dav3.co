<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		level?: 1 | 2 | 3 | 4 | 5 | 6
		text: string
	}

	export let level = 1
	export let text = ""

	$: anchor = text
		.replaceAll(/[^a-zA-Z0-9\s]/g, "")
		.replaceAll(/\s/g, "-")
		.toLowerCase()
</script>

{#if level === 1}
	<h1 {...$$props} id={anchor}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href="/#{anchor}"
			>#</a
		>
		{text}
	</h1>
{:else if level === 2}
	<h2 {...$$props} id={anchor}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href="/#{anchor}"
			>#</a
		>
		{text}
	</h2>
{:else if level === 3}
	<h3 {...$$props} id={anchor}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href="/#{anchor}"
			>#</a
		>
		{text}
	</h3>
{:else if level === 4}
	<h4 {...$$props} id={anchor}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href="/#{anchor}"
			>#</a
		>
		{text}
	</h4>
{:else if level === 5}
	<h5 {...$$props} id={anchor}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href="/#{anchor}"
			>#</a
		>
		{text}
	</h5>
{:else if level === 6}
	<h6 {...$$props} id={anchor}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href="/#{anchor}"
			>#</a
		>
		{text}
	</h6>
{/if}
