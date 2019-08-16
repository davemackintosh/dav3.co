import React from "react"
import {NavLi, NavLink, NavUl} from '@src/shared/theme/nav';

export interface PostHeaderTagsProps {
  tags: string[] | undefined,
}

export default function PostHeaderTags(props: PostHeaderTagsProps) {
  return (
    <nav>
      <NavUl columns={8} rows="auto">
        <NavLi>🏷️: </NavLi>
        {
          (props.tags || []).map((tag: string) => (
            <NavLi key={tag}>
              <NavLink
                to={ `/tag/${tag}` }
                title={ `See more posts tagged with ${tag}` }
              >
                #{ tag }
              </NavLink>
            </NavLi>
          ))
        }
      </NavUl>
    </nav>
  )
}
