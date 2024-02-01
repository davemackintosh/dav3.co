import { fetchMarkdownWorkHistory } from "$src/lib/work-history"
export const prerender = true
export const load = async () => {
	const workHistory = await fetchMarkdownWorkHistory()

	return {
		workHistory,
	}
}
