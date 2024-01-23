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
		<li class="title">
			<a title="Experienced Lead Developer" href="/">DAV3</a>
		</li>
		<li>
			<a title="Dave Mackintosh's blog posts" href="/blog">Blog</a>
		</li>
		<li>
			<a title="Work history" href="/work-history">Work history / CV</a>
		</li>
	</ul>
</nav>

<main {...$$props} id="content">
	<slot />
</main>

<footer>
	<ul>
		<li>
			<a title="Experienced Lead Developer" href="/">DAV3</a>
		</li>
		<li>
			<a title="Dave Mackintosh's blog posts" href="/blog">Blog</a>
		</li>
		<li>
			<a title="Work history" href="/work-history">Work history / CV</a>
		</li>
	</ul>
	<ul>
		<li>
			<a rel="me" href="https://fosstodon.org/@davemackintosh">🐘 Follow me on Mastodon</a>
		</li>
		<li>
			<a target="_blank" rel="nofollow noreferrer" href="https://github.com/davemackintosh"
				>Github</a
			>
		</li>
		<li>
			<a target="_blank" title="Dave Mackintosh LinkedIn" href="https://www.linkedin.com/in/dav3"
				>💼 LinkedIn</a
			>
		</li>
	</ul>
</footer>

<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 0;
		width: 100%;
		margin: 0 auto;
		min-height: 100vh;
	}

	@media (min-width: 768px) {
		main {
			padding: 0 1rem;
		}
	}

	nav,
	footer {
		display: flex;
		flex-direction: row;
		background-color: rgba(0, 0, 0, 0.7);
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		backdrop-filter: blur(4px);
	}

	footer {
		margin-top: 2em;
	}

	@media print {
		nav,
		footer {
			display: none;
		}
	}

	ul {
		width: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	ul li {
		list-style: none;
		padding: 1em 2em;
	}

	ul li.title {
		flex-grow: 1;
		font-weight: 700;
		font-size: 1.2em;
		font-family: var(--attentionFontStack);
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
		color: #fff;
		text-decoration: none;
	}

	footer ul {
		flex-direction: column;
	}

	a:hover {
		text-decoration: underline;
	}

	@media only screen and (max-device-width: 480px) {
		ul li {
			text-align: center;
			font-size: 0.8em;
		}

		#content {
			padding: 0 1rem;
		}
	}
</style>
