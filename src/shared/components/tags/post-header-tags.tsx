import React from "react"
import { NavLink } from "@src/shared/theme/nav"
import styled from "styled-components"

export interface PostHeaderTagsProps {
  tags: string[]
}

const TagList = styled.ul`
  margin: 0;
  padding: 0;
`

const TagItem = styled.li`
  list-style: none;
  display: inline-block;
  margin-right: 1rem;
`

export default function PostHeaderTags(
  props: PostHeaderTagsProps,
): JSX.Element {
  return (
    <nav>
      <TagList>
        <TagItem>🏷️:</TagItem>
        {(props.tags || []).map((tag: string) => (
          <TagItem key={tag}>
            <NavLink
              to={`/tag/${tag.toLowerCase()}`}
              title={`See more posts tagged with ${tag}`}
            >
              #{tag}
            </NavLink>
          </TagItem>
        ))}
      </TagList>
    </nav>
  )
}
