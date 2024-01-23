<script lang="ts">
	import Page from "$src/components/Page.svelte"
	import Heading from "$src/components/Heading.svelte"
	import type { Post } from "$src/lib/posts"
	import Date from "$src/components/Date.svelte"

	export let data: Post
	console.log(data)
</script>

<Page>
	<article>
		<Heading text={data.metadata.title} />
		{#if data.metadata.published}
			<Date date={data.metadata.published} />
		{/if}

		<svelte:component this={data.content} />
	</article>
</Page>
