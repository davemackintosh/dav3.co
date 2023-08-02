import { fetchMarkdownPosts } from "$lib/posts"
export const load = async () => {
	const posts = await fetchMarkdownPosts()

	return {
		posts
	}
}
