<script lang="ts">
	import "$src/styles.css"
	import avi from "$lib/assets/avi.png"
	import Heading from "$src/components/Heading.svelte"
	import Page from "$src/components/Page.svelte"
	import Header from "$src/components/Header.svelte"
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
		Museum, and various other local brands. My journey has been defined by a deep commitment to
		putting people first and ensuring that technology serves as a powerful tool to enhance their
		lives.
	</p>
	<p>
		As a seasoned professional who has not only run a successful business solo for a decade but also
		contributed to and led numerous projects, I bring a unique blend of technical expertise and
		leadership skills to the table. Now, I am eagerly seeking a new challenge as a Chief Technology
		Officer (CTO) to steer a company towards greater heights.
	</p>
	<p>
		Throughout my career, I have emphasized delivering stable code that is not only highly
		performant but also maintainable and readable. I firmly believe that a well-architected and
		thoroughly understood codebase is the foundation for long-term success in any project.
	</p>
	<p>
		My approach is marked by a comprehensive discovery process, wherein I collaborate closely with
		you to understand your mission, goals, and aspirations for your product. By uncovering the
		essence of what makes your offering exceptional in its class, I can craft a technology strategy
		that aligns seamlessly with your vision.
	</p>
</Page>
