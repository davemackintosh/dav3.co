<aside>
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
				<a title="Experienced Software Developer & Business Owner | Seeking CTO Role" href="/"
					>Home</a
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
</aside>

<main {...$$props} id="content">
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 0;
		width: 100%;
		margin: 0 auto;
		min-height: 100vh;
	}

	aside {
		background-color: #26292d;
		min-height: 100vh;
		width: 30%;
		max-width: 225px;
	}

	@media (min-width: 768px) {
		main {
			padding: 0 1rem;
		}
	}

	nav {
		display: flex;
		flex-direction: column;
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
		flex-direction: column;
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
