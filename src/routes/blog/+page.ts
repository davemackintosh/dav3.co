import { fetchMarkdownPosts } from "$lib/posts"
export const prerender = true;
export const load = async () => {
	const posts = await fetchMarkdownPosts()

	return {
		posts
	}
}
