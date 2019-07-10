import React from "react"
import { NavLink } from "react-router-dom"

export interface PostHeaderTagsProps {
  tags: string[] | undefined,
}

export default function PostHeaderTags(props: PostHeaderTagsProps) {
  return (
    <nav className="tags-list">
      <ul>
        <li className="tag">Tags: </li>
        {
          (props.tags || []).map((tag: string) => (
            <li className="tag" key={ tag }>
              <NavLink
                to={ `/tag/${tag}` }
                title={ `See more posts tagged with ${tag}` }
                activeClassName="active"
              >
                #{ tag }
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
