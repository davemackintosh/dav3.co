import React, { Fragment } from "react"
import {
  WorkHistoryOl,
  WorkHistoryLi,
  CompanyName,
  JobTag,
  WorkHistoryDetails,
  WorkHistoryDetailsSummary,
  JobDate,
} from "@src/shared/theme/work-history"
import workHistory, { WorkHistoryEntry } from "@src/work-history"
import { ContentProps } from "types/content"
import Markdown from "@components/md-parser/md-parser"
import { Permalink } from "@src/shared/components/markdown-renderers/header-N"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Decwmber",
]

const WorkHistoryEntryComponent = (props: WorkHistoryEntry): JSX.Element => {
  const feedback = props.feedback ? (
    <WorkHistoryDetails>
      <WorkHistoryDetailsSummary>
        Feedback from the company
      </WorkHistoryDetailsSummary>
      {props.feedback}
    </WorkHistoryDetails>
  ) : null

  const fromDate = `${
    monthNames[props.dates[0].getMonth()]
  } ${props.dates[0].getFullYear()}`
  const toDate = props.dates[1] ? (
    <JobDate dateTime={props.dates[1].toLocaleDateString()}>
      {`${
        monthNames[props.dates[1].getMonth()]
      } ${props.dates[1].getFullYear()}`}
    </JobDate>
  ) : (
    <JobDate>current</JobDate>
  )

  return (
    <WorkHistoryLi>
      <CompanyName>{props.company}</CompanyName>
      <p>
        <em>from:</em>{" "}
        <JobDate dateTime={props.dates[0].toLocaleDateString()}>
          {fromDate}
        </JobDate>{" "}
        <em>to</em> {toDate}
      </p>
      {props.tags.map(tag => (
        <JobTag key={tag}>{tag}</JobTag>
      ))}
      <p>{props.description}</p>
      {feedback}
    </WorkHistoryLi>
  )
}

const WorkHistory = (props: ContentProps): JSX.Element => {
  return (
    <Fragment>
      <h1 id="work-history">
        <Permalink
          to={"#work-history"}
          title="Permalink to Dave Mackintosh's Work History"
        >
          #
        </Permalink>
        Dave Mackintosh&apos;s Work History
      </h1>
      <Markdown markdown={props.markdown} />
      <WorkHistoryOl>
        {workHistory.map(
          (entry: WorkHistoryEntry): JSX.Element => (
            <WorkHistoryEntryComponent key={entry.company} {...entry} />
          ),
        )}
      </WorkHistoryOl>
    </Fragment>
  )
}

export default WorkHistory
