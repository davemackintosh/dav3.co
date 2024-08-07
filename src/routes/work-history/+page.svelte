<script lang="ts">
	import DateC from "$src/components/Date.svelte"
	import Heading from "$src/components/Heading.svelte"
	import Page from "$src/components/Page.svelte"
	import SvelteMarkdown from "svelte-markdown"

	interface WorkHistoryEntry {
		dates: Date[]
		company: string
		tags: string[]
		description: string
		feedback?: string[]
		personal?: boolean
	}

	const work: WorkHistoryEntry[] = [
		{
			dates: [new Date(2022, 0, 30)],
			company: "Definition Health",
			tags: ["react", "graphql", "apollo", "cdk", "golang", "aws", "python", "lua", "leadership"],
			description: `Frontend, backend, devops, platform engineering and architect. I spend my time:

* Enabling the wider team with tooling and cross boundary knowledge of our stack and technology choices.
* Leading of a remote technical team and mentoring and teaching other members of the team.
* Writing GoLang, Python, Lua & React/TypeScript.
* Creating infrastructure as code using Cloudformation and using CDK with GoLang and Python.
* Scripting our translation layer with Lua, transforming
 * FHIR to HL7
 * HL7 to FHIR
 * CITO files to AWS S3 
& sFTP
 * LLP HL7 to FHIR
 * HL7 to HTTP
* architecting innovative solutions
* solutionising business problems with the aim to professionalise the business`,
			feedback: [
				"I have had the pleasure of working closely with Dave on THINK surgical project. He excelled in fostering a collaborative and positive work environment. One notable quality of Dave is his exceptional problem-solving skills. He approaches challenges with a strategic mindset, identifying innovative solutions and implementing them effectively. This ability has significantly contributed to the success of our projects. I believe that Dave would make an excellent developer lead. His technical prowess, leadership abilities, and commitment to excellence make him an asset to any team. ~ Aleksandr Volkodatov",
				"I have worked with Dave on a number of projects over the years whilst we were both contracting and in our current roles at Definition Health. The best word I can think of for him is \"fixer\"... whether it's architecting a brand new solution to a hard problem or dealing with legacy codebases, he's always the go-to person across any team. ~ Shane Hudson",
				"Dave is a talented and passionate team player and leader. I’m glad to work with him. We spent hours coding from scratch together, and he created a supportive atmosphere where I knew that, if something went wrong, we would overcome it together. I admire his experience, his adeptness at transitioning between programming languages, technologies and tasks, understanding business needs, product considerations, and ability to ask right questions. Dave can easily initiate projects from scratch, provide ongoing support and drive continuous improvements. In our team, he definitely helped us achieve our goals, made difficult decisions, and led us in the right direction. Any projects/companies would find him highly impactful and valuable ~ Alina Sauchuk",
			],
		},
		{
			dates: [new Date(2023, 5, 1), new Date(2024, 6, 1)],
			company: "Sale Nook",
			tags: ["aws", "svelte", "graphql", "rust", "CQRS"],
			description: `Sale Nook, the ultimate solution for creative shop owners looking to simplify their inventory management and boost their online sales. We understand the challenges that independent artists and makers face when it comes to juggling multiple e-commerce platforms and keeping track of inventory. That's why we've created a powerful and intuitive set of tools specifically designed to streamline your creative business’s sales and offer support on your small business journey.

I've designed and built the entire application solo, it's a Svelte Kit app deployed to Vercel with a using these technologies and concepts:

* Rust powered lambdas
* Custom CQRS and event stream backed serverless architecture
* Aurora postgres and DynamoDB as the persistence layers
* SQS/SNS
* CDK
* Python for scripting various devops tools
* Appsync and IAM for the graphql and authorisation model

the business technologies used and integrated with:

* stripe
* freeagent

as well as all the usual things a founder has to do such as market research, proof of concepting, user research, business plan and board pack writing, product market fit research, hiring and roadmap management`,
		},
		{
			dates: [new Date(2021, 6, 1), new Date(2022, 0, 1)],
			company: "Race at Your Pace feat Browser London",
			tags: ["react", "react-native", "graphql", "apollo"],
			description:
				"Re-platforming Race at Your Pace using React Native and graphql with a mixture of AWS backed services. With a fairly aggressive timeline we (Browser London and me) delivered a web and mobile app in partnership very quickly. ",
		},
		{
			dates: [new Date(2021, 3, 1), new Date(2021, 6, 1)],
			company: "Dela",
			tags: ["react", "native", "plaid", "fintech", "postgraphile", "nexjs", "graphql", "apollo"],
			description:
				"A custom marketing referral platform built using nextJS, postgraphile and graphql which encourages small businesses and evangelists to share campaigns and grow businesses organically. The platform is built on NextJS using postgraphile to generate a performant and secure API using Postgres. It is deployed to AWS using the CDK and Github actions.",
		},
		{
			dates: [new Date(2020, 10, 15), new Date(2021, 1, 15)],
			company: "Dimply AI",
			tags: ["react", "react-native", "plaid", "fintech", "postgraphile", "graphql", "apollo"],
			description:
				"Building an AI powered fintech solution to help people understand their finances better, built using postgraphile and react-native.",
		},
		{
			dates: [new Date(2020, 4, 5), new Date(2020, 10, 13)],
			company: "Sleepio",
			tags: ["react", "redux", "react-native"],
			description:
				"A React Native developer working on the components of the AST based app we were building, each was cross platform and generic enough that the content creators in the company can build entire programs (logic included) that is delivered as an AST to the app and constructed.",
		},
		{
			dates: [new Date(2017, 10, 1), new Date(2020, 4, 9)],
			company: "Freybors",
			tags: ["react", "redux", "sockets", "multicolour", "flowjs", "tachyons", "postgres"],
			description:
				"A React and NodeJS developer rebuilding an existing product from architecture, development practices, scrum mentoring, team support and mentoring to building an incredibly complex, cofiguration based system where half of the interface is generated entirely from Multicolour models.",
			feedback: [
				"I've worked with Dave for about 5 months at a London startup and loved every minute. He's one of those rare engineers who's not only fast, but also rigorous with TDD, coverage, types and documentation. He writes beautiful code that's easy to understand and a pleasure to work with; this is what you want in a contractor - someone who leaves a positive legacy and not spaghetti. Recommended! ~ Jof Arnold",
			],
		},
		{
			dates: [new Date(2015, 9, 1), new Date(2021, 0, 1)],
			company: "Multicolour",
			personal: true,
			tags: ["multicolour", "nodeJS"],
			description:
				"Multicolour was a NodeJS, REST API generator. It offered multiple ways to authenticate your API (JWT, OAuth), it suports basic content negotiation (JSONAPI), it supports many many database technologies out of the box. It powers many user's experiences and they don't even know. Large companies and small companies use this product. I'm currently rebuilding it from scratch for a 1.0 to remove many parts of the software that let the product as a whole down using TypeScript and many other new and improved features like built in event streams, CQRS built in and a fully automated documentation and error tracking system.",
		},
		{
			dates: [new Date(2018, 5, 1), new Date(2018, 6, 1)],
			company: "Leviton feat. Ascender",
			tags: ["react", "FlowJS", "redux", "multicolour", "postgres", "lua", "nginx"],
			description:
				"I partnered with Ascender to provide a custom, from scratch admin panel for Leviton. The software was to control entire buildings of lights using a lua powered OpenResty API. The client was on a very tight budget and i agreed to the work. In just 22 days an entire custom built admin panel was ready for testing including a form generator powered by an API. The development API was done using Multicolour so the build wasnt hung up on the backend developer finishing their work.",
		},
		{
			dates: [new Date(2017, 2, 1), new Date(2017, 10, 1)],
			company: "Verve",
			tags: ["Angular 1", "react"],
			description:
				"I was a general purpose developer in this organisation, most of my time was spent working on improvements to their payment path and fixing bugs in their existing software before being put on the React team to work on the rebuild of their platform.",
		},
		{
			dates: [new Date(2017, 1, 1), new Date(2017, 2, 1)],
			company: "National Army Museum feat. Squint Opera",
			tags: ["backbone", "multicolour", "svg"],
			description:
				"Squint Opera and I had worked together previously and we teamed up again to help the National Army Museum build their new exhibit technology with home baked analytics. I built the exhibit map and analytics API and visualised them on a map of the entire building, per exhibit.",
			feedback: ["Dave is a great developer. Fun and diligent. His work is top notch. ~ Rob Mason"],
		},
		{
			dates: [new Date(2016, 10, 1), new Date(2017, 2, 1)],
			company: "Google/Tishman Speyer feat. Hirsch&Mann",
			tags: ["cordova", "multicolour", "realtime", "cco", "odroid", "android"],
			description:
				"Due to the success of our partnership previously Hirsch&Mann engaged me again to help build the technology to power physical displays used by Google for their pop-up store in New York during the Pixel release. This was a real time synchronised visual dance of varying animations across nearly 300 devices in a sphere. Tishman Speyer used the same technology to synchronise 200 screens playing videos to within a few ms of difference. I built this using Multicolour, Sockets, Cordova/CCA and custom made framework for delivering all the required code from the primary node in the network.",
			feedback: [
				"Dave was a great partner for many months on a challenging project. We're an innovation service provider and build technological solutions that have never been done; pushing our imagination, problem-solving, and endurance. In this context, Dave led coding on an entire ecosystem of servers and clients to help us deliver a new product line to top-shelf clients. Dave is a highly skilled team member, and we recommend him without reservation. ~ Alan Reitsch",
			],
		},
		{
			dates: [new Date(2016, 6, 1), new Date(2016, 7, 1)],
			company: "Tour De France/Skoda feat. Hirsch&Mann",
			tags: ["react", "MySQL", "Neo4j", "Express", "Knex"],
			description:
				"I was contacted by Alan at Hirsch&Mann to work on a mobile application that allowed cyclists in the U.K to find a ride that best matched a section of the Tour de France in ways such as pitch, length, difficulty, et . Originally we built this with Neo4j but the performance was just unacceptable so in a single day I rewrote all our comparison algorithms into single purpose MySQL queries. The API was built using ExpressJS, Knex and the application was written using ReactJS. My role wasn't just to develop but evolved into pulling the team together during some hard sprints and mentoring other developers.",
			feedback: [
				"Dave was an excellent team lead on a truly challenging sprint. Above and beyond his mandate, and surpassing his peers in capability and efficiency, Dave was able to remain focused and productive on his own tasks while helping to guide other team members. Dave was highly responsive to status requests, and was diligent with code check-ins and documentation. His code reads extremely well. In short, you could not do better than to have Dave on your team, and we are grateful to have had him work hard to make our project a success. ~ Alan Reitsch",
			],
		},
	]
</script>

<Page>
	<Heading text="Dave Mackintosh's Work History" />
	<p>
		I use technology to solve problems, I pick the appropriate technology to solve the problem at
		the highest speed and quality I can. I enjoy solving all kinds of problems from team
		organisation and member learning to complex automation platforms and creative visuals.
	</p>
	<p>
		Half of my career has been in developing creative, visual and interactive works of art for
		clients like Harrods, Google and the other half of my career to date has been developing
		software to automate away national client's business problems and to consolidate third party
		apps and APIs into single source of truth business platforms.
	</p>

	{#each work as entry}
		<article class="client">
			<Heading level={2} text={entry.company} />
			<div>
				<DateC date={entry.dates[0]} /> - <DateC date={entry.dates[1]} />
			</div>
			<SvelteMarkdown source={entry.description} />
			<div class="skills">
				{#each entry.tags as tag}
					<span class="skill">{tag}</span>
				{/each}
			</div>
			{#if entry.feedback}
				<details>
					<summary>feedback</summary>
					{#if entry.feedback && entry.feedback.length > 1}
						<div class="multiple-feedback">
							{#each entry.feedback as feedback}
								<blockquote>{feedback}</blockquote>
							{/each}
						</div>
					{:else}
						<blockquote>{entry.feedback[0]}</blockquote>
					{/if}
				</details>
			{/if}
		</article>
	{/each}
</Page>

<style>
	.client {
		margin-bottom: 2rem;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
	}

	.skill {
		border: 1px solid #4f93ce;
		padding: 0.5rem;
		margin: 0.5rem;
		border-radius: 0.5rem;
	}

	details {
		font-style: italic;
	}

	details summary:hover {
		cursor: pointer;
	}

	.multiple-feedback {
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap: 1em;
	}

	@media only screen and (max-device-width: 480px) {
		.multiple-feedback {
			grid-template-columns: 1fr;
		}
	}
</style>
