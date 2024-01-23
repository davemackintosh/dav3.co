<script lang="ts">
	import Page from "$src/components/Page.svelte"
	import Heading from "$src/components/Heading.svelte"
	import type { Post } from "$src/lib/posts"
	import Date from "$src/components/Date.svelte"
	import SEO from "$src/components/SEO.svelte"
	import "$src/laserwave.prism.css"

	export let data: Post
</script>

<SEO
	title={data.metadata.title}
	description={data.metadata.excerpt}
	keywords={data.metadata.tags}
/>

<Page>
	<article>
		<Heading text={data.metadata.title} />
		{#if data.metadata.published}
			<Date date={data.metadata.published} />
		{/if}

		<svelte:component this={data.content} />
	</article>
</Page>
