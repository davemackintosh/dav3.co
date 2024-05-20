<script lang="ts">
	import { inject } from "@vercel/analytics"
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"
	import "@fontsource/ibm-plex-mono"
	import "$src/styles.css"

	inject()
	injectSpeedInsights()
</script>

<slot />
