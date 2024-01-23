<script lang="ts">
	import type { PostWithContent } from "$lib/posts"
	import Page from "$src/components/Page.svelte"
	export let data: { posts: PostWithContent[] }
</script>

<Page>
	<h1>Blog</h1>

	<ol>
		{#each data.posts as post}
			<li>
				<h2>
					<a href={post.path}>
						{post.meta.title}
					</a>
				</h2>
				{#if post.meta.published}
					<small>
						<time datetime={post.meta.published.toLocaleDateString()}>
							{post.meta.published.toLocaleDateString()}
						</time>
					</small>
				{/if}
				{#if post.meta.excerpt}
					<p>{post.meta.excerpt}</p>
				{/if}
			</li>
		{/each}
	</ol>
</Page>

<style>
	ol {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
		padding: 0;
		margin: 0;
	}

	li {
		list-style: none;
	}

	h2 {
		margin: 0;
	}

	small {
		display: inline;
		font-size: 0.8rem;
	}
</style>
