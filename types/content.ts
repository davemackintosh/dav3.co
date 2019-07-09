export interface Content {
  posts: ContentProps[],
  pages: ContentProps[],
}

export interface ContentProps {
  frontmatter: {
    path: string,
    published: string,
    title?: string,
    description?: string,
    keywords?: string[],
    bodyClasses?: string,
    excerpt?: string,
  },
  markdown: string,
  contentPath: string,
}

export interface $content {
  posts: ContentProps,
  pages: ContentProps,
}
