import type { PostMeta } from "$src/lib/posts"

export async function load({ params }: { params: { slug: string } }): Promise<PostMeta> {
	const post = await import(`../${params.slug}.md`)
	const content = post.default

	return {
		content,
		...post,
	}
}
