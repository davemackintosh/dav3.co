import { fetchMarkdownPosts } from "$src/lib/posts"
import { json } from "@sveltejs/kit"

export const GET = async () => {
	const posts = await fetchMarkdownPosts(4)
	return json(posts)
}
