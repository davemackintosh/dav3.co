import React from "react"
import { ContentProps } from "types/content"

import { Nav, NavLi, NavLink, NavUl, SkipToContentNavLink } from "@styled/nav"

export interface SiteNavProps {
  pages: ContentProps[]
}

export default function SiteNav(props: SiteNavProps): JSX.Element {
  return (
    <Nav>
      <SkipToContentNavLink
        href="#content"
        className="skip-to-content"
        title="Skip navigation and header and go straight to the content"
        tabIndex={0}
      >
        Skip to content
      </SkipToContentNavLink>
      <NavUl rows={1} columns={4}>
        <NavLi>
          <NavLink
            to="/"
            title="Dave Mackintosh - Web developer"
            activeClassName="active"
          >
            Home
          </NavLink>
        </NavLi>
        <NavLi>
          <NavLink
            to="/blog"
            title="Dave Mackintosh blog post listing"
            activeClassName="active"
          >
            Blog
          </NavLink>
        </NavLi>
        {props.pages
          .filter((page: ContentProps) => page.frontmatter.path !== "/")
          .filter(
            (page: ContentProps) =>
              typeof page.frontmatter.menu === "undefined" ||
              page.frontmatter.menu,
          )
          .map((page: ContentProps) => (
            <NavLi key={page.frontmatter.path}>
              <NavLink
                to={page.frontmatter.path}
                title={page.frontmatter.title}
                aria-current="page"
                activeClassName="active"
              >
                {page.frontmatter.title}
              </NavLink>
            </NavLi>
          ))}
      </NavUl>
    </Nav>
  )
}

SiteNav.defaultProps = {
  pages: [],
}
