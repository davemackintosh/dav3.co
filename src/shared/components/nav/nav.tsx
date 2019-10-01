import React from "react"
import { ContentProps } from "../../../../types/content"

import { Nav, NavLi, NavLink, NavUl, SkipToContentNavLink } from "@styled/nav"
import { BookingButton } from "@src/shared/components/booking-button"

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
      <NavUl rows={2} columns={2}>
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
        <NavLi>
          <BookingButton />
        </NavLi>
        {props.pages
          .filter((page: ContentProps) => page.frontmatter.path !== "/")
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
