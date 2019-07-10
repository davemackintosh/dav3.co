/**
 * @TODO:
 * I'd really like to expand this to include reading a variable based on input from
 * the user to adjust the reading time based on disabilities.
 *
 * I'd also like to adjust reading time for images, code blocks, blockquotes, etc
 * that are harder to context switch for all readers
 */

import React from "react"

export interface WordCountProps {
  text: string,
  wpm?: number,
}

function WordCount(props: WordCountProps) {
  const wordCountMatch = (props.text || "")
    .trim()
    .match(/[\W+'-.]/g)

  const wordCount = wordCountMatch
    ? wordCountMatch.length
    : 0

  const WPM = props.wpm || 225
  let readTime = Math.ceil(wordCount / WPM)
  let readTimeVerb = "minutes"

  if (readTime > 60) {
    readTimeVerb = "hours"
    readTime /= 60
  }

  if (readTime < 1) {
    return (
      <span className="read-time">
        less than a minute
      </span>
    )
  }

  return (
    <span className="read-time">
      Read time: { readTime } { readTimeVerb }
    </span>
  )
}

WordCount.defaultProps = {
  text: "",
  wpm: 225,
}

export default WordCount
