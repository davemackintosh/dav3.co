import type { ServerLoadEvent } from "@sveltejs/kit"

export const load = async ({ fetch }: ServerLoadEvent) => {
	const response = await fetch(`/api/latest-posts`)
	const posts = await response.json()

	return {
		posts,
	}
}
