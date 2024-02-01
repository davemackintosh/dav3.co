import { fetchAllMarkdownByType, FetchContentType, type MarkdownContent } from "./markdown"

export interface PostMeta {
	author?: string
	excerpt?: string
	keywords?: string[]
	published: Date
	title: string
}

export interface PostMetaFE extends Omit<PostMeta, "published"> {
	published: string
}

export const fetchMarkdownPosts = async (
	count: number = Infinity,
): Promise<MarkdownContent<PostMeta>[]> => {
	const allPosts = await fetchAllMarkdownByType<PostMeta>(FetchContentType.POSTS)

	return allPosts
		.map((post) => {
			if (post.metadata.published) post.metadata.published = new Date(post.metadata.published)
			return post
		})
		.sort((a, b) => b.metadata.published.valueOf() - a.metadata.published.valueOf())
		.slice(0, count)
}
