<script lang="ts">
	import { inject } from "@vercel/analytics"
	import "@fontsource/ibm-plex-mono"
	import "$src/styles.css"

	inject()
</script>

<slot />
