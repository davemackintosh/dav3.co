import type { ComponentType } from "svelte"

export interface MarkdownContent<T> {
	metadata: T
	path: string
	content: ComponentType
}

interface Resolver<T> extends MarkdownContent<T> {
	default: ComponentType
}

export enum FetchContentType {
	POSTS,
	WORKHISTORY,
}

function filesByType<T>(type: FetchContentType): Record<string, () => Promise<Resolver<T>>> {
	switch (type) {
		case FetchContentType.POSTS:
			return import.meta.glob<Resolver<T>>("/src/routes/blog/*.md")
		case FetchContentType.WORKHISTORY:
			return import.meta.glob<Resolver<T>>("/src/routes/work-history/entries/*.md")
	}
}

export async function fetchMarkdown<T>([path, resolver]: [
	string,
	() => Promise<Resolver<T>>,
]): Promise<MarkdownContent<T>> {
	const { metadata, default: content } = await resolver()
	const postPath = path.slice(11, -3)

	return {
		path: postPath,
		metadata,
		content,
	}
}

export async function fetchAllMarkdownByType<T>(
	type: FetchContentType,
): Promise<MarkdownContent<T>[]> {
	const allFiles = filesByType<T>(type)
	const iterableFiles = Object.entries(allFiles)

	return Promise.all(iterableFiles.map(fetchMarkdown))
}
