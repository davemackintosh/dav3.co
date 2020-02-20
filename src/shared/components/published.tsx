import React from "react"
import styled from "styled-components"

export interface PublishedProps {
  published: string
}

const TimeStyled = styled.time`
  display: block;
`

export const Published = (props: PublishedProps): JSX.Element => {
  const publishedAsDate = new Date(props.published)
  const publishedDateString = `${publishedAsDate.getDate()}/${publishedAsDate.getMonth() +
    1}/${publishedAsDate.getFullYear()}` // eslint-disable-line max-len
  return (
    <TimeStyled dateTime={props.published}>{publishedDateString}</TimeStyled>
  )
}
