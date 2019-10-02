import styled from "styled-components"
import theme from "@src/shared/theme/theme"

export const WorkHistoryOl = styled.ol`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`
export const WorkHistoryLi = styled.li`
  width: 100%;
  margin: 0;
  margin-bottom: 2em;
`
export const WorkHistoryDetails = styled.details``
export const WorkHistoryDetailsSummary = styled.summary`
  color: ${theme.colors.fontCta};
`
export const CompanyName = styled.strong`
  color: ${theme.colors.fontAttention};
`
export const JobTag = styled.span`
  padding: 0.5em 0.6em 0.5em 0.5em;
  color: ${theme.colors.fontCta};
  border: 1px solid ${theme.colors.fontCta};
  margin-right: 0.5em;
  font-size: 0.7em;
  font-style: italic;
  border-radius: 0.3em;
`
export const JobDate = styled.time``
