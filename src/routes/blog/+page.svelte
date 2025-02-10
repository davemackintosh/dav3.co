<script lang="ts">
	import type { PostWithContent } from "$lib/posts"
	import Page from "$src/components/Page.svelte"
	import Seo from "$src/components/SEO.svelte"

	export let data: { posts: PostWithContent[] }

	$: console.log("FATA", data)
</script>

<Seo
	title="Dave Mackintosh Blog"
	description="With 20 years of software development expertise and a successful 10-year solo business. Explore my track record of working with renowned clients and delivering stable, high-performant code with a people-first approach"
	keywords={[
		"dave",
		"mackintosh",
		"web",
		"javascript",
		"nodejs",
		"react",
		"rust",
		"developer",
		"mentor",
		"golang",
	]}
/>

<Page>
	<h1>Blog</h1>

	<ol>
		{#each data.posts as post}
			<li>
				<h2>
					<a href={post.path}>
						{post.metadata.title}
					</a>
				</h2>
				{#if post.metadata.published}
					<small>
						<time datetime={post.metadata.published.toLocaleDateString()}>
							{post.metadata.published.toLocaleDateString()}
						</time>
					</small>
				{/if}
				{#if post.metadata.excerpt}
					<p>{post.metadata.excerpt}</p>
				{/if}
			</li>
		{/each}
	</ol>
</Page>

<style>
	ol {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-gap: 1rem;
		padding: 0;
		margin: 0;
	}

	li {
		list-style: none;
	}

	h2 {
		margin: 0;
		word-wrap: break-all;
	}

	small {
		display: inline;
		font-size: 0.8rem;
	}

	@media only screen and (max-device-width: 480px) {
		ol {
			display: block;
		}
	}
</style>
