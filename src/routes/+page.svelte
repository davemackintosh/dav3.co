<script lang="ts">
	import avi from "$lib/assets/avi.png"
	import Heading from "$src/components/Heading.svelte"
	import Page from "$src/components/Page.svelte"
	import Seo from "$src/components/SEO.svelte"
	import Date from "$src/components/Date.svelte"
	import type { PostMetaFE, PostWithContent } from "$src/lib/posts"

	const testimonials = [
		"Dave's superpower is applying the right approach to solving the problem at hand in the best way. From lightning fast thinking when troubleshooting production issues to considered, thoughtful, approaches with technical designs, Dave is usually right and not by accident or luck. On top of that he brings a friendly, positive energy to a group of people and is always willing to help others out. ~ Jeff Shepherd",
		"I have had the pleasure of working closely with Dave on THINK surgical project. He excelled in fostering a collaborative and positive work environment. One notable quality of Dave is his exceptional problem-solving skills. He approaches challenges with a strategic mindset, identifying innovative solutions and implementing them effectively. This ability has significantly contributed to the success of our projects. I believe that Dave would make an excellent developer lead. His technical prowess, leadership abilities, and commitment to excellence make him an asset to any team. ~ Aleksandr Volkodatov",
		"Dave is a talented and passionate team player and leader. I’m glad to work with him. We spent hours coding from scratch together, and he created a supportive atmosphere where I knew that, if something went wrong, we would overcome it together. I admire his experience, his adeptness at transitioning between programming languages, technologies and tasks, understanding business needs, product considerations, and ability to ask right questions. Dave can easily initiate projects from scratch, provide ongoing support and drive continuous improvements. In our team, he definitely helped us achieve our goals, made difficult decisions, and led us in the right direction. Any projects/companies would find him highly impactful and valuable ~ Alina Sauchuk",
		"I have worked with Dave on a number of projects over the years whilst we were both contracting and in our current roles at Definition Health. The best word I can think of for him is \"fixer\"... whether it's architecting a brand new solution to a hard problem or dealing with legacy codebases, he's always the go-to person across any team. ~ Shane Hudson"
	]

	export let data: { posts: PostWithContent<PostMetaFE>[] } = { posts: [] }
</script>

<Seo
	title="Experienced Lead Developer | Engineering Manager"
	description="With 20 years of software development expertise and a successful 10-year solo business. Explore my track record of working with renowned clients and delivering stable, high-performant code with a people-first approach"
	keywords={[
		"serverless",
		"architect",
		"platform",
		"native",
		"engineer",
		"mentor",
		"manager"
	]}
/>

<Page>
	<h1>Passionate engineering manager and developer</h1>
	<p>
		With over two decades of experience in the software development industry, I have had the
		privilege of working with esteemed clients like Google, Harrods, Breitling, Debenhams, ABRSM,
		Sleepio, Skoda, The National Army Museum, and many many local brands. My journey has been
		defined by a deep commitment to putting people first and ensuring that technology serves as a
		powerful tool to enhance their lives.
	</p>

	<Heading level={2} text="Latest posts" />
	<section class="latest-posts">
		{#each data.posts as post}
			<article class="post-excerpt">
				<a href={post.path} title={post.metadata.title}><h3>{post.metadata.title}</h3></a>
				<Date date={post.metadata.published} />
				<p>{post.metadata.excerpt}</p>
			</article>
		{/each}
	</section>

	<Heading level={2} text="About me" />
	<section class="hero">
		<div>
			<p>
				As a seasoned software engineering manager with 20+ years of experience, I specialise in creating and leading high-impact engineering teams, driving technical innovation, and ensuring seamless communication between stakeholders. I also have a wealth of experience in designing system architectures and managing platforms.
			</p>
			<p>
				I excel at demystifying complex technical challenges for non-technical teams, fostering a collaborative environment where ideas can flow freely and quickly translate into results.
			</p>
			<p>
				From leading cross-functional teams in global projects to designing scalable architectures, I ensure that both technical excellence and stakeholder needs align and by building inclusive teams and streamlining communication, I’ve consistently delivered high-quality software, reducing delivery timelines and improved team performance.
			</p>
			<p>
				I spend most of my time leading and mentoring teams of developers writing Rust, Go and React/TypeScript in serverless environments.
			</p>
		</div>
		<img src={avi} alt="illustration of Dave Mackintosh" width="256" height="256" />
	</section>

	<Heading level={2} text="Kind words" />
	<section class="testimonials">
		{#each testimonials as testimonial}
			<blockquote>{testimonial}</blockquote>
		{/each}
	</section>
</Page>

<style>
	.hero {
		display: flex;
		flex-direction: row;
	}

	section {
		margin-bottom: 2em;
	}

	.testimonials,
	.latest-posts {
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap: 1em;
	}

	.post-excerpt h3 {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.latest-posts article {
		overflow: hidden;
	}

	@media only screen and (max-device-width: 480px) {
		.testimonials,
		.latest-posts {
			grid-template-columns: 1fr;
		}

		.hero {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
