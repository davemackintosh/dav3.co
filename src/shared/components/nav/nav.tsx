import React from "react"
import { NavLink } from "react-router-dom"
import {ContentProps} from "../../../../types/content"

import {Nav} from "@styled/nav"

export interface SiteNavProps {
  pages: ContentProps[],
}

export default function SiteNav(props: SiteNavProps) {
  return (
    <Nav>
      <ul className="flex list items-start">
        <li className="w-15 mr2">
          <a
            href="#content"
            className="skip-to-content"
            title="Skip navigation and header and go straight to the content"
          >
           Skip to content
          </a>
        </li>
        <li className="w-5 mr2">
          <NavLink
            to="/"
            title="Dave Mackintosh - Web developer"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li className="w-5 mr2">
          <NavLink
            to="/blog"
            title="Dave Mackintosh blog post listing"
            activeClassName="active"
          >
            Blog
          </NavLink>
        </li>
        {
          props.pages
            .filter((page: ContentProps) => page.frontmatter.path !== "/")
            .map((page: ContentProps) => (
              <li
                key={ page.frontmatter.title }
                className="w-15 mr2"
              >
                <NavLink
                  to={ "/" + page.frontmatter.path }
                  title={ page.frontmatter.title }
                  aria-current="page"
                  activeClassName="active"
                >
                  { page.frontmatter.title }
                </NavLink>
              </li>
            ))
        }
      </ul>
    </Nav>
  )
}

SiteNav.defaultProps = {
  pages: [],
}
