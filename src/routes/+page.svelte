<script lang="ts">
	import avi from "$lib/assets/avi.png"
	import Heading from "$src/components/Heading.svelte"
	import Page from "$src/components/Page.svelte"
</script>

<svelte:head>
	<title>Experienced Software Developer & Business Owner | Seeking CTO Role</title>
	<meta
		name="description"
		content="With 20 years of software development expertise and a successful 10-year solo business, I am now actively seeking a new opportunity as a Chief Technology Officer (CTO). Explore my track record of working with renowned clients and delivering stable, high-performant code with a people-first approach"
	/>
	<meta
		name="keywords"
		content="dave mackintosh web javascript nodejs react native developer mentor golang swiftui c++ CTO"
	/>
</svelte:head>

<Page>
	<div class="hero-container">
		<div class="hero">
			<p>
				👋 I'm Dave Mackintosh, I lead Golang, AWS Devops, C++, Swift and JavaScript/Typescript
				teams
			</p>
			<div>
				<a rel="me" href="https://fosstodon.org/@davemackintosh">🐘 Follow me on Mastodon</a>
			</div>
		</div>
		<div class="hero">
			<img src={avi} alt="Cartoon of Dave Mackintosh" />
		</div>
	</div>

	<Heading text="Golang, SwiftUI, React, NodeJS, JavaScript" />
	<p>
		With over two decades of experience in the software development industry, I have had the
		privilege of working with esteemed clients like Google, ABRSM, Sleepio, Skoda, The National Army
		Museum, and many many local brands. My journey has been defined by a deep commitment to putting
		people first and ensuring that technology serves as a powerful tool to enhance their lives.
	</p>
	<p>
		As a seasoned professional who has not only run a successful business solo for a decade but also
		contributed to and led numerous projects, I bring a unique blend of technical expertise and
		leadership skills to the table.
	</p>
	<p>
		Throughout my career, I have emphasized delivering stable code that is not only highly
		performant but also maintainable and readable. I firmly believe that a well-architected and
		thoroughly understood codebase is the foundation for long-term success in any project.
	</p>
</Page>

<style>
	.hero-container {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		background-color: #5a5e65;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQImWNgYGD4z0AswK4SAFXuAf8EPy+xAAAAAElFTkSuQmCC);
	}

	@media (max-width: 768px) {
		.hero-container {
			margin-top: 0;
			flex-direction: column-reverse;
			text-align: center;
			align-items: center;
			justify-content: center;
		}
	}

	@media (min-width: 768px) {
		.hero {
			line-height: 2em;
			text-align: center;
		}
	}
</style>
