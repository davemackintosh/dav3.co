/* eslint-disable no-sync*/
// I actually don't care that these methods are sync,
// they are not part of a request chain and can't be
// abused to cause a DDOS of any service.
import frontmatter from "front-matter"
import fs from "fs"
import path from "path"
import { ContentProps, ContentPropsFrontmatter } from "../types/content"

interface IntermediaryContent {
  contentPath: string
  content: string
}

const postsPath = path.resolve(process.cwd(), "./posts")
const pagesPath = path.resolve(process.cwd(), "./pages")

const escapeMD = (val: string): string =>
  (val || "")
    .replace(/[']/g, "&apos;")
    .replace(/["]/g, "&quot;")
    .replace(/[\b]/g, "\\b")
    .replace(/[\f]/g, "\\f")
    .replace(/[\n]/g, "\\n")
    .replace(/[\r]/g, "\\r")
    .replace(/[\t]/g, "\\t")

const getContentFromFolder = (folderPath: string): ContentProps[] =>
  fs
    .readdirSync(folderPath)
    .filter((filePath): boolean => filePath.endsWith(".md"))
    .map(
      (contentPath: string): IntermediaryContent => ({
        contentPath,
        content: fs.readFileSync(`${folderPath}/${contentPath}`).toString(),
      }),
    )
    .map(
      (content: IntermediaryContent): ContentProps => {
        const { attributes, body } = frontmatter(content.content)

        if (!attributes.path) {
          attributes.path = content.contentPath.substr(
            0,
            content.contentPath.lastIndexOf("."),
          )
        }

        return {
          contentPath: content.contentPath,
          frontmatter: Object.keys(
            attributes as keyof ContentPropsFrontmatter,
          ).reduce(
            (
              out: ContentPropsFrontmatter,
              currentKey,
            ): ContentPropsFrontmatter => {
              if (
                typeof attributes[currentKey] === "string" &&
                currentKey !== "path" &&
                currentKey !== "title"
              ) {
                out[currentKey as keyof ContentPropsFrontmatter] = escapeMD(
                  attributes[currentKey],
                )
              } else if (currentKey === "title") {
                out.title = escape(attributes.title)
              }
              return out
            },
            attributes,
          ),
          markdown: escape(body),
        }
      },
    )

export const posts = getContentFromFolder(postsPath)
export const pages = getContentFromFolder(pagesPath)
