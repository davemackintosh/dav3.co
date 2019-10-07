---
title: Searching text quickly with JavaScript
keywords: 
  - javascript
  - nodejs
  - boyer-moore
  - horspool
excerpt: Searching strings in JavaScript is easy right? what about searching through hundreds of megabytes of text or binary or even several gigabytes? Boyer-Moore Horspool to the rescue!
author: davemackintosh
published: false
status: draft
---

Searching for one piece of text in another is an expensive business. searching small amounts of text is pretty performant, say:

```javascript
const myText = "toothbrushes"
myText.search("tooth") // 0
myText.search("brush") // 5
```

innocent enough, right? works for most of us and would actually be slower to use any other kind of algorithm to search. 

But, what if you had to search a 1mb file upload, 100mb? 1GB? well, thats just going to be undeniably slow. 

# Boyer-Moore JavaScript

There are lots of papers on the Boyer-Moore family of algorithms but im going to write about the Boyer-Moore Horspool algorithm. It is a text searching algorithm with a low complexity and medium memory footprint.

It works by constructing a table of characters present within the search string and using that to actually *skip* checking a certain number of characters entirely.

Your browser probably uses the Boyer-Moore algorithm every time you search in a web page.

**What am I using it for?**

I'm using it in the rebuild of [Multicolour](https://getmulticolour.com) to help parse incoming form data and file uploads in multipart format.

Typically a `multipart/form-data` body is split by a token to indicate the start and end of each field. Here is an example multipart payload separated by `--boundary`

```text
POST /test.html HTTP/1.1
Host: example.org
Content-Type: multipart/form-data;boundary="boundary"

--boundary
Content-Disposition: form-data; name="field1"

value1
--boundary
Content-Disposition: form-data; name="field2"; filename="example.txt"

My text file contents, this is super secret. Don't tell the NSA or the aliens will come and get us and take us to Zona.
--boundary--
```

We can see two fields in this payload. `field1` is a `form-data` field. `field2` is a piece of `form-data` too. Except, we see it has a `filename`, this is the file that was uploaded.

Well, thats nice and all but what the heck do we do with it? Well, we have a couple of important pieces of information in the request. We get what that boundary is as a header and we know its `.length`. This + our body is all we need to get started parsing this.

The first thing we need to do is create a storage for each known character of the search text. We'll call this our "bad char table". I'm going to use a `Buffer` to construct this table as we'll be comparing against a buffer in our search body.

```typescript
makeBadCharTable(pattern: string): Buffer {
    const DICT_SIZE = 65535
    const badCharShift: Buffer = Buffer.allocUnsafe(DICT_SIZE)
    const truePatternLength = pattern.length - 1

    // Populate the table with the default.
    for (let i = 0; i <= DICT_SIZE; i++) {
      badCharShift[i] = pattern.length
    }

    // Add our offsets.
    for (let char = 0; char < truePatternLength; char++) {
      badCharShift[pattern[char]] = truePatternLength - char
    }

    return badCharShift
  }
```

Theres a few things happening here, first I declare the size of our dictionary. This is a "magic" number but it happens to be the maximum number of characters there can be in JavaScript.

I then pre-populate our table with the `un`true length of the pattern. I do this because if we hit a mismatch while we're searching later, we want to skip to the true length of the pattern + 1 and JavaScript does this for us anyway because 0-indexed arrays.

Then we loop over the length of the pattern and we assign a value to it which is `true length of string - index we're at`. This is how many characters we're going to skip when there's a mismatch.

The eagle eyed might notice I'm using `Buffer.allocUnsafe(DICT_SIZE)` and wince but this is perfectly safe here as we write over it with our default values straight away instead of letting Node writenit with 0s and then giving it to us.

Then we return our table of indexes.

### Time to search

We're going to search our body now and get the indexes of each occurance of our boundary. We'll then use this to split our body up into fields.

```typescript
search(text: Buffer, pattern: string, badCharShift: Buffer) {
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

        break pattern
      }
    }
  }
```

Wow, there's a lot happening here. Let's break it down.

**Goals**

* We want the indexes of each occurance of `--boundary`. 
  * We assume the last index is the closing token for the body so it's trailing `--` is moot.
* Do this using only the body, bad char table and our search pattern.
* Do this correctly and quickly.

> I'm using [`labelled loops`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) for readability. You can ommit the labels without changing behaviour.

So, what the *heck* is happening? 

First up is we start to loop over every character in the target text, we then start another loop over the search text from it's last character to thr first. We do this because if there's a mismatch we can at least skip the entire length of the search pattern + 1. This is where the algorithm shines, when you have a large search string you skip more characters and the performance of this algorithm actualky decreases the shorter the search string.

When we hit a character that matches, we move onto the next character in the search text until either theres no more search text which is a full match and we push to our results array or we skip the number of characters specified by our bad char table on a mismatch.

## Conclusion

This algorithm is super fast for getting the locations.
