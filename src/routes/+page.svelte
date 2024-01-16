<script lang="ts">
	import avi from "$lib/assets/avi.png"
	import Heading from "$src/components/Heading.svelte"
	import Page from "$src/components/Page.svelte"

	const testimonials = [
		"Highly innovative thinker, with a lightning speed ability to problem solve and put forward valid solutions to all implementations of the stack. Opinionated, and doesn't cut corners. As a project lead, he listened and managed his team considerately, as well as passing on valuable knowledge and techniques, making the web, better ~ easyProperty, London",
		"I've worked with Dave for about 5 months at a London startup and loved every minute. He's one of those rare engineers who's not only fast, but also rigorous with TDD, coverage, types and documentation. He writes beautiful code that's easy to understand and a pleasure to work with; this is what you want in a contractor - someone who leaves a positive legacy and not spaghetti. Recommended! ~ Freybors, London",
		"I worked with Dave on a Node.js API in 2015, he was very professional and a delight to work with. His code is among the cleanest I've ever seen. We have since become co-hosts of Creative Meet, a small meetup in Chichester that brings designers and developers together, alongside encouraging small talks to share knowledge and experience. ~ ABRSM, London",
		"Dave was an excellent team lead on a truly challenging sprint. Above and beyond his mandate, and surpassing his peers in capability and efficiency, Dave was able to remain focused and productive on his own tasks while helping to guide other team members. Dave was highly responsive to status requests, and was diligent with code check-ins and documentation. His code reads extremely well. In short, you could not do better than to have Dave on your team, and we are grateful to have had him work hard to make our project a success. ~ Skoda/TDF/Hirsch & Mann, London",
	]
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

	<Heading level={2} text="Kind words" />
	<div class="testimonials">
		{#each testimonials as testimonial}
			<blockquote>{testimonial}</blockquote>
		{/each}
	</div>
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

	.testimonials {
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap: 1rem;
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

	@media only screen and (max-device-width: 480px) {
		.testimonials {
			grid-template-columns: 1fr;
		}
	}
</style>
