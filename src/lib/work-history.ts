import { fetchAllMarkdownByType, FetchContentType, type MarkdownContent } from "./markdown"

interface WorkHistoryMetaBE {
	dates: string[]
	company: string
	roleName: string
	skills: string[]
	feedback?: MarkdownContent<WorkHistoryFeedbackMeta>[]
	personal?: boolean
}

export interface WorkHistoryMeta extends Omit<WorkHistoryMetaBE, "dates"> {
	dates: Date[]
}

export interface WorkHistoryFeedbackMeta { }

export async function fetchMarkdownWorkHistoryFeedback(
	forWorkHistory: WorkHistoryMetaBE | WorkHistoryMeta,
): Promise<MarkdownContent<WorkHistoryFeedbackMeta>[]> {
	const feedback = await fetchAllMarkdownByType<WorkHistoryFeedbackMeta>(FetchContentType.FEEDBACK)

	return feedback.filter((fb) =>
		fb.path.startsWith(forWorkHistory.company.replace(/ /g, "-").toLowerCase()),
	)
}

export async function fetchMarkdownWorkHistory(): Promise<MarkdownContent<WorkHistoryMeta>[]> {
	const workHistory = await fetchAllMarkdownByType<WorkHistoryMetaBE>(FetchContentType.WORKHISTORY)

	return (
		await Promise.all(
			workHistory.map(async (entry): Promise<MarkdownContent<WorkHistoryMeta>> => {
				const {
					metadata: { dates, ...metadataRest },
					...entryRest
				} = { ...entry }

				const newEntry: MarkdownContent<WorkHistoryMeta> = {
					...entryRest,
					metadata: {
						...metadataRest,
						feedback: await fetchMarkdownWorkHistoryFeedback(entry.metadata),
						dates: dates.map((date) => new Date(Date.parse(date))),
					},
				}
				return newEntry
			}),
		)
	).sort((a, b) => b.metadata.dates[0].valueOf() - a.metadata.dates[0].valueOf())
}
