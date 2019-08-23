---
title: Budge it - Processing Bank Statements With JavaScript
keywords: 
  - javascript
  - finances
  - personal
  - analysis
excerpt: I wanted to understand our finances better and all the tools online I found were premium model and ironically expensive. Lets parse bank statements with JavaScript!
author: davemackintosh
published: 2019-08-23T11:29:40.643Z
status: published
---

> Parsing bank statements will be easy!

It was and it wasn't, getting something dull and nonhelpful was pretty simple. I started by downloading a years worth of transactions from my online bank and got to work looping over each record. Natwest; quite helpfully, only uses one column for their money in and money out and it's either positive or negative.

This is easy to parse and keep a running total.

They also helpfully have the *current* balance so in order to get the opening balance it was just a case of grabbing the first/oldest record present in the CSV and using this column to initialise the balance. This was necessary because originally, all my tests were returning negative numbers because I was in a positive opening balance. I would imagine that if you had a negative opening balance, you might see the opposite.

But that was all I got done that day, I was at my parents in law's house playing with the kids and just stealing a few minutes here and there to work on this.

