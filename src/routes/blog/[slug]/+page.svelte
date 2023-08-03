<script lang="ts">
	import Page from "$src/components/Page.svelte"
	import Heading from "$src/components/Heading.svelte"
	import type { Post } from "$src/lib/posts"

	export let data: Post
	console.log(data)
</script>

<Page>
	<article>
		<Heading text={data.metadata.title} />
		{#if data.published}
			<small>
				<time datetime={data.published.toLocaleDateString()}>
					{data.published.toLocaleDateString()}
				</time>
			</small>
		{/if}

		<svelte:component this={data.content} />
	</article>
</Page>
