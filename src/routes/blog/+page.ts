import { fetchMarkdownPosts, type PostMeta } from "$lib/posts"
import type { MarkdownContent } from "$src/lib/markdown"
export const prerender = true
export const load = async (): Promise<{ posts: MarkdownContent<PostMeta>[] }> => {
	const posts = await fetchMarkdownPosts()

	return {
		posts,
	}
}
