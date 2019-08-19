import React, {Component} from "react"
import styled from 'styled-components';
import {Grid} from '@src/shared/theme/grid';

export interface TestimonialProps {
  testimonials: string[]
}

export default class Testimonials extends Component<TestimonialProps> {
  static defaultProps = {
    testimonials: [],
  }

  private renderTestimonial(testimonial: string): JSX.Element {
    const StyledBlockquote = styled.blockquote`
    `
    return (
      <StyledBlockquote>
        {testimonial}
      </StyledBlockquote>
    )
  }

  render() {
    const TestimonialGrid = Grid("div")

    return (
      <TestimonialGrid columns={2}>
        {this.props.testimonials.map(this.renderTestimonial, this)}
      </TestimonialGrid>
    )
  }
}
