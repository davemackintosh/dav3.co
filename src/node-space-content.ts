import frontmatter from "front-matter"
import fs from "fs"
import path from "path"

import {
  ContentProps,
} from "../types/content"
const postsPath = path.resolve("./posts")
const pagesPath = path.resolve("./pages")

const escape = (val: string): string =>
  (val || "")
    .replace(/[\']/g, "&apos;")
    .replace(/[\"]/g, "&quot;")
    .replace(/[\\]/g, "\\\\")
    .replace(/[\/]/g, "\\/")
    .replace(/[\b]/g, "\\b")
    .replace(/[\f]/g, "\\f")
    .replace(/[\n]/g, "\\n")
    .replace(/[\r]/g, "\\r")
    .replace(/[\t]/g, "\\t")

const getContentFromFolder = (folderPath: string): ContentProps[] =>
  fs.readdirSync(folderPath)
    .filter((filePath): boolean => filePath.endsWith(".md"))
    .map((contentPath) => ({
      contentPath,
      content: fs.readFileSync(`${folderPath}/${contentPath}`).toString(),
    }))
    .map((content) => {
      const {
        attributes,
        body,
      } = frontmatter(content.content)

      if (!attributes.path) {
        attributes.path = content.contentPath.substr(0, content.contentPath.lastIndexOf("."))
      }

      return {
        contentPath: content.contentPath,
        frontmatter: Object.keys(attributes).reduce((out, currentKey) => {
          if (typeof attributes[currentKey] === "string") {
            out[currentKey] = escape(attributes[currentKey])
          }
          return out
        }, attributes),
        markdown: escape(body),
      }
    })

export const posts = getContentFromFolder(postsPath)
export const pages = getContentFromFolder(pagesPath)

