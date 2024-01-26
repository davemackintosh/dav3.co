<script lang="ts">
	import Page from "$src/components/Page.svelte"
	import Heading from "$src/components/Heading.svelte"
	import type { Post } from "$src/lib/posts"
	import DateView from "$src/components/Date.svelte"
	import SEO from "$src/components/SEO.svelte"
	import "$src/laserwave.prism.css"

	export let data: Post
</script>

<SEO
	title={data.metadata.title}
	description={data.metadata.excerpt ?? ""}
	keywords={data.metadata.keywords}
/>

<Page>
	<article>
		<Heading text={data.metadata.title} />
		{#if data.metadata.published < new Date(2024, 0, 1)}
			<p class="archived">
				This is an old post and the contents may or may not be correct anymore and links may or may
				not be safe.
			</p>
		{/if}
		{#if data.metadata.published}
			<DateView date={data.metadata.published} />
		{/if}

		<svelte:component this={data.content} />
	</article>
</Page>

<style>
	.archived {
		color: #856404;
		background-color: #fff3cd;
		border-color: #ffeeba;
		position: relative;
		padding: 0.75rem 1.25rem;
		margin-bottom: 1rem;
		border: 1px solid transparent;
		border-radius: 0.25rem;
	}
</style>
