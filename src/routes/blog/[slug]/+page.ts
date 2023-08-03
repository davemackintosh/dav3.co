import type { Post } from "$src/lib/posts"

export async function load({ params }: { params: { slug: string } }): Promise<Post> {
	const post = await import(`../${params.slug}.md`)
	const content = post.default

	return {
		content,
		...post,
	}
}
