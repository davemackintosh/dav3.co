export interface Content {
  posts: ContentProps[]
  paginatedPosts: ContentProps[][]
  pages: ContentProps[]
}

export interface ContentPropsFrontmatter {
  path: string
  published: string
  title?: string
  description?: string
  keywords?: string[]
  bodyClasses?: string
  excerpt?: string

  // This exists so that we can add whatever other
  // variables we want to the frontmatter object.
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ContentProps {
  frontmatter: ContentPropsFrontmatter
  markdown: string
  contentPath: string
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface Global {
      $content: {
        posts: string
        pages: string
      }

      Process: {
        env: {
          NODE_ENV?: string
        }
        platform?: string
      }
    }
  }
}
