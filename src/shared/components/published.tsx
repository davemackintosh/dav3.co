import React from "react"
import styled from 'styled-components';

export interface PublishedProps {
  published: string
}

const TimeStyled = styled.time`
  display: block;
`

export const Published = (props: PublishedProps) => {
  const publishedAsDate = new Date(props.published)
  const publishedDateString = `${publishedAsDate.getDate()}/${publishedAsDate.getMonth()}/${publishedAsDate.getFullYear()}`
  return (
    <TimeStyled dateTime={props.published}>
      {publishedDateString}
    </TimeStyled>
  )
}
