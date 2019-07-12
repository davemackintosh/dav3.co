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

declare global {
  namespace NodeJS {
    interface Global {
      $content: {
        posts: string,
        pages: string,
      },

      Process: {
        env: {
          NODE_ENV?: string,
        },
        platform?: string,
      },
    }
  }
}
