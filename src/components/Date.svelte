<script lang="ts">
	export let date: Date | string
	export let fallback = "Current"

	let actualDate = date instanceof Date ? date : new Date(date)
</script>

{#if date}
	<small>
		<time datetime={actualDate.toLocaleDateString()}>
			{actualDate.toLocaleDateString()}
		</time>
	</small>
{:else}
	<small>{fallback}</small>
{/if}
