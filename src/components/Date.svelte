<script lang="ts">
	export let date: Date
	export let fallback = "Current"
</script>

{#if date}
	<small>
		<time datetime={date.toLocaleDateString()}>
			{date.toLocaleDateString()}
		</time>
	</small>
{:else}
	<small>{fallback}</small>
{/if}
