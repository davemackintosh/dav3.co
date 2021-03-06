import React, { Component } from "react"
import { XmlEntities } from "html-entities"
import media from "styled-media-query"
import styled from "styled-components"
import { Grid } from "@src/shared/theme/grid"

/**
 * Testimonials are stored as plain strings
 * in an array.
 */
export interface TestimonialProps {
  testimonials: string[]
}

export const StyledBlockquote = styled.blockquote`
  padding: 0;
  margin: 0;
  position: relative;
  font-size: 0.8em;

  &:before {
    content: "“";
    position: absolute;
    top: 0;
    left: -0.75em;
    font-size: 3em;
    color: rgba(255, 255, 255, 0.5);
  }

  ${media.lessThan("medium")`
    margin-bottom: 1rem;
  `}
`

export default class Testimonials extends Component<TestimonialProps> {
  static defaultProps = {
    testimonials: [],
  }

  decode = new XmlEntities().decode

  private renderTestimonial(testimonial: string): JSX.Element {
    return <StyledBlockquote>{this.decode(testimonial)}</StyledBlockquote>
  }

  render(): JSX.Element {
    const TestimonialGrid = styled(Grid("div"))`
      align-items: baseline;
      grid-gap: 2em;

      ${media.lessThan("medium")`
      grid-template-columns: 1fr;
      grid-template-rows: 2;
      grid-auto-rows: min-content;

      & ${StyledBlockquote}:nth-child(n + 3) {
        display: none;
      }`}
    `

    return (
      <TestimonialGrid columns={2} rows="auto">
        {this.props.testimonials.map(this.renderTestimonial, this)}
      </TestimonialGrid>
    )
  }
}
