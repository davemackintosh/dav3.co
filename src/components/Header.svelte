<nav>
	<a
		href="#content"
		class="skip-to-content"
		title="Skip navigation and header and go straight to the content"
		tabindex="0"
	>
		Skip to content
	</a>
	<ul>
		<li>
			<a title="Experienced Software Developer & Business Owner | Seeking CTO Role" href="/">Home</a
			>
		</li>
		<li>
			<a title="Dave Mackintosh blog posts" href="/blog">Blog</a>
		</li>
		<li>
			<a title="Work history" href="/work-history">Work history</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		width: 80vw;
		margin: 1rem auto;
	}

	@media print {
		nav {
			display: none;
		}
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	li {
		list-style: none;
		padding: 1em 2em;
	}

	.skip-to-content {
		position: absolute;
		left: -999rem;
		width: 0;
		height: 0;
	}

	.skip-to-content:focus {
		position: initial;
	}

	a {
		font-weight: 700;
	}
</style>
