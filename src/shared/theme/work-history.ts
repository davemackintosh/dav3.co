import styled from "styled-components"
import media from "styled-media-query"
import theme from "@src/shared/theme/theme"

export const WorkHistoryOl = styled.ol`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjxyZWN0IGZpbGw9JyNlODJlYTcnIHg9JzAnIHk9JzAnIHdpZHRoPScxJyBoZWlnaHQ9JzEwMCUnLz48L3N2Zz4=);
  background-repeat: repeat-y;
  background-position-x: 50%;

  @media (max-width: 768px) {
    background-image: none;
  }

  @media print {
    background-image: none;
  }
`
export const WorkHistoryLi = styled.li`
  width: 100%;
  margin: 0;
  margin-bottom: 2em;
  box-sizing: border-box;

  @media screen and (min-width: 768px) {
    &:nth-child(odd) {
      padding-right: 50%;

      text-align: left;
    }

    &:nth-child(even) {
      padding-left: 50%;
      text-align: right;
    }
  }
`
export const WorkHistoryDetails = styled.details`
  @media print {
    display: none;
  }
`
export const WorkHistoryDetailsSummary = styled.summary`
  color: ${theme.colors.fontCta};

  &:hover {
    cursor: pointer;
  }
`
export const CompanyName = styled.strong`
  display: inline-block;
  color: ${theme.colors.fontAttention};
  border-bottom: 1px solid ${theme.colors.fontAttention};
  width: 100%;
`
export const JobTag = styled.span`
  display: inline-block;
  padding: 0.5em 0.6em 0.5em 0.5em;
  color: ${theme.colors.fontCta};
  border: 1px solid ${theme.colors.fontCta};
  margin-right: 0.5em;
  font-size: 0.7em;
  font-style: italic;
  border-radius: 0.3em;

  ${media.lessThan("medium")`
    padding: 0 0.3em 0 0.25em;
    margin-bottom: 0.5em;
  `}
`
export const JobDate = styled.time``
