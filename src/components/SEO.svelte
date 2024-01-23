<script lang="ts">
	import { PUBLIC_CANONICAL_ORIGIN } from "$env/static/public"
	import { page } from "$app/stores"

	export let title: string
	export let description: string
	export let keywords: string[] = []
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{PUBLIC_CANONICAL_ORIGIN}{$page.url.pathname}" />
	{#if keywords}
		<meta name="keywords" content={keywords.join(" ")} />
	{/if}
	<slot />
</svelte:head>
