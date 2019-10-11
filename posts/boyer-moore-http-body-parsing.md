---
title: Using the results of our Boyer Moore to parse a HTTP body
keywords: 
  - javascript
  - nodejs
  - boyer-moore
  - horspool
  - http body
  - parsing
excerpt: In my previous post, I taught you how to search a HTTP multipart body for a boundary and get a list of indices that indicate the start and end of each field. In this post, we're going to use that to parse these fields to helpful objects.
author: davemackintosh
published: false
status: draft
---

If you haven't read [Fast HTTP body searching in JavaScript to parse strings (Part 1)](/blog/fast-text-searching-in-javascript) then I suggest you go read it, it covers how to get the data we're going to be using in this post to locate the varying fields of our target data to parse them out as objects.

This post covers how we're going to convert our single large body into smaller, individual fields from our form. Most of the context of this post is about a single field as we loop over them several times to process them.

## Further processing into form fields

This of course only tells us where each field starts and stops and we need to actually do more processing to make this information useful to whatever handler requires it.

The `Buffer` we have plus our indices are enough to split our body into some rudimentary fields which also need more processing because these fields contain information on the type of content they contain and their name. These fields follow a similar pattern in structure which we can use to reliably process down to some useful structure.

Lets take the first field of our pretend payload and try to extract it and process it further.

We'll loop over the results from our `search` function which will be an array of numbers (in TypeScript land thid is annotated as `: number[]` and we'll use these to create an array of buffers.

```typescript
function getBodyFieldStrings(
  body: Buffer,
  boundaryIndices: number[],
): Buffer[] {
  const bodyParts = []
  // Loop over the indices - 2 (-1 for true length, -1 to ignore body terminator.
  for (
    let currentMatchIndex = 0, max = boundaryIndices.length - 2;
    currentMatchIndex < max;
    currentMatchIndex++
  ) {
    const bodyPiece = body.slice(
      boundaryIndices[currentMatchIndex] + this.pattern.length - 1,
      boundaryIndices[currentMatchIndex + 1],
    )

    bodyParts.push(bodyPiece)
  }

  return bodyParts
}

```

Luckily the `Buffer` object contains a method for slicing another up. So, we simply loop over our indices from the `search` function and pass the value at the index as the first argument to `.slice` and we simply end our slice at thr beginning of the next index which would be the current index + 1 or `undefined` and when `.slice` only gets one argument it goes all the way to the end of the Buffer.

This operation will give us a field like the below

```text
Content-Disposition: form-data; name="field1"

value1
```

As we can see, this is what we're looking for and we're on the home straight to having a parsed field to work with! Luckily, to get the value of the field we can again use our `.search` method again with the search string of `"\r\n\r\n"` and apply a limit of `1` results to it. We use the Boyer Moore again because a `.split("\r\n")` will attempt to split the entire body by that when we only really care about the first instance as the terminator for the header definitions.

> Why not try adding a limit for yourself?

```typescript:SPOILER
+ function search(
+   text: Buffer, 
+   pattern: string, 
+   badCharShift: Buffer, 
+   limit = 0
+ ) {
  const results: number[] = []
  let skip = 0

  haystackLoop: for (
    let haystackChar = 0, maxTextChar = text.length - 1;
    haystackChar <= maxTextChar;
    haystackChar += skip
  ) {
    pattern: for (
      let needleChar = pattern.length - 1;
      needleChar >= 0;
      needleChar--
    ) {
      const lookupIndex = haystackChar + needleChar
      skip = badCharShift[text[haystackChar + (this.pattern.length - 1)]]

      if (text[lookupIndex] !== pattern[needleChar]) {
        break pattern
      } else if (needleChar === 0) {
        results.push(haystackChar)
        skip = pattern.length

+       if (limit !== 0 && results.length >= limit) {
+         break haystackLoop
+       }

        break pattern
      }
    }
  }
```

