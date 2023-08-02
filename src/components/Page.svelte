<script lang="ts">
	import Header from "$src/components/Header.svelte"
	import Footer from "$src/components/Footer.svelte"
	import type { HTMLAttributes } from "svelte/elements"

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		maxWidth?: string
		withHeader?: boolean
		withFooter?: boolean
	}

	export let maxWidth = "64rem"
	export let withHeader = true
	export let withFooter = true
</script>

{#if withHeader}
	<Header />
{/if}
<main {...$$props} style="max-width: {maxWidth}" id="content">
	<slot />
</main>
{#if withFooter}
	<Footer />
{/if}

<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 0;
		width: 100%;
		margin: 0 auto;
		min-height: 80vh;
	}
</style>
