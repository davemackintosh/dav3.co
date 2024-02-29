import type { ComponentType } from "svelte"

export interface Post {
	content: ComponentType
	metadata: PostMeta
}

interface GlobbedPosts {
	metadata: PostMeta
}

export interface PostMeta {
	author?: string
	excerpt?: string
	keywords?: string[]
	published: Date
	title: string
	// A Svelte component as rendered by mdsvex
	content: ComponentType
}

export interface PostMetaFE extends Omit<PostMeta, "published"> {
	published: string
}

export interface PostWithContent<MetaFormat = PostMeta> {
	metadata: MetaFormat
	path: string
}

export const fetchMarkdownPost = async ([path, resolver]: [
	string,
	() => Promise<GlobbedPosts>,
]): Promise<PostWithContent> => {
	const data = await resolver()
	const { metadata } = data
	const postPath = path.slice(11, -3)

	if (metadata.published) metadata.published = new Date(metadata.published)

	return {
		metadata: metadata,
		path: postPath,
	}
}

export const fetchMarkdownPosts = async (count: number = Infinity): Promise<PostWithContent[]> => {
	const allPostFiles = import.meta.glob<GlobbedPosts>("/src/routes/blog/*.md")
	const iterablePostFiles = Object.entries(allPostFiles)

	const allPosts: PostWithContent[] = (
		await Promise.all(iterablePostFiles.map(fetchMarkdownPost))
	)
		.sort((a, b) => b.metadata.published.valueOf() - a.metadata.published.valueOf())
		.slice(0, count)

	return allPosts
}
