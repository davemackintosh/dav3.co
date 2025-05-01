<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import { slug } from "github-slugger"
	import { page } from "$app/stores"

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		level?: 1 | 2 | 3 | 4 | 5 | 6
		text: string
	}

	export let level = 1
	export let text = ""

	$: anchor = slug(text)
	$: url = `${$page.url.pathname}#${anchor}`
</script>

<!-- svelte-ignore a11y-missing-content -->
<a id={anchor} />
{#if level === 1}
	<h1 {...$$props}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href={url}>#</a>
		{text}
	</h1>
{:else if level === 2}
	<h2 {...$$props}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href={url}>#</a>
		{text}
	</h2>
{:else if level === 3}
	<h3 {...$$props}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href={url}>#</a>
		{text}
	</h3>
{:else if level === 4}
	<h4 {...$$props}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href={url}>#</a>
		{text}
	</h4>
{:else if level === 5}
	<h5 {...$$props}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href={url}>#</a>
		{text}
	</h5>
{:else if level === 6}
	<h6 {...$$props}>
		<a aria-current="page" title="Permalink to jump to this header - '{text}'" href={url}>#</a>
		{text}
	</h6>
{/if}
