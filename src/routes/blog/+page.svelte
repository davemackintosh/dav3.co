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
				<small>
					<time datetime={post.meta.published}>
						{post.meta.published}
					</time>
				</small>
			</li>
		{/each}
	</ol>
</Page>

<style>
	ol {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		padding: 0;
		margin: 0;
	}

	li {
		list-style: none;
	}
</style>
