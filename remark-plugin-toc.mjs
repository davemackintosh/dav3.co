// mdsvex-toc.js
import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'

export const mdsvexToc = () => {
	return (tree) => {
		const headings = [];

		// Function to sanitize heading text for ID generation
		const sanitize = (str) => {
			return str
				.toLowerCase()
				.replace(/<[^>]*>?/gm, '') // Remove HTML tags
				.replace(/&[a-z\d]+;/gi, '') // Remove HTML entities
				.trim();
		};

		// 1. Search for our Heading components.
		visit(tree, 'html', (node) => {
			if (!node.value.startsWith("<Heading")) {
				return
			}
			const text = node.value.match(/.*text="(.*)".*/)[1]
			const depth = node.value.match(/.*level={(.*)}.*/)[1]

			if (!text) {
				return
			}

			const cleanText = sanitize(text);
			const id = slug(cleanText); // Generate unique ID

			headings.push({
				id,
				text,
				depth,
			});
		});

		if (headings.length > 0) {
			const toc = {
				type: 'list',
				ordered: false, // Use a bulleted list
				children: headings.map(h => ({
					type: 'listItem',
					children: [
						{
							type: 'link',
							url: `#${h.id}`,
							children: [{ type: 'text', value: h.text }],
						},
					],
				}))
			};


			tree.children.unshift({
				type: 'html',
				value: '<div class="table-of-contents"><h2>Table of Contents</h2></div>', //Customizable
			});
			tree.children.splice(1, 0, toc);
		}
	};
};


