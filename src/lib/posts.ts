import type { ComponentType } from "svelte"

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

export interface PostWithContent {
	meta: PostMeta
	path: string
}

export const fetchMarkdownPosts = async (): Promise<PostWithContent[]> => {
	const allPostFiles = import.meta.glob<GlobbedPosts>("/src/routes/blog/*.md")
	const iterablePostFiles = Object.entries(allPostFiles)

	const allPosts: PostWithContent[] = (
		await Promise.all(
			iterablePostFiles.map(async ([path, resolver]): Promise<PostWithContent> => {
				const data = await resolver()
				const { metadata } = data
				const postPath = path.slice(11, -3)

				if (metadata.published) metadata.published = new Date(metadata.published)

				return {
					meta: metadata,
					path: postPath,
				}
			}),
		)
	).sort((a, b) => b.meta.published.valueOf() - a.meta.published.valueOf())

	return allPosts
}
