import { fetchAllMarkdownByType, FetchContentType, type MarkdownContent } from "./markdown"

export interface WorkHistoryMeta {
	dates: Date[]
	company: string
	roleName: string
	skills: string[]
	feedback?: string[]
	personal?: boolean
}

export async function fetchMarkdownWorkHistory(): Promise<MarkdownContent<WorkHistoryMeta>[]> {
	const workHistory = await fetchAllMarkdownByType<WorkHistoryMeta>(FetchContentType.WORKHISTORY)

	return workHistory.sort((a, b) => b.metadata.dates[0].valueOf() - a.metadata.dates[0].valueOf())
}
