interface GlobbedPosts {
	metadata: Post
}

export interface Post {
	author?: string
	excerpt?: string
	keywords?: string[]
	published?: string
	title: string
}

export interface PostWithContent {
	meta: Post
	path: string
}

export const fetchMarkdownPosts = async (): Promise<PostWithContent[]> => {
	const allPostFiles = import.meta.glob<GlobbedPosts>('/src/routes/blog/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const data = await resolver()
			const { metadata } = data
			const postPath = path.slice(11, -3)

			return {
				meta: metadata,
				path: postPath,
			}
		})
	)

	return allPosts
}

