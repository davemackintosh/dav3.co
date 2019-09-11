---
title: Widi, a small project with a giant footprint with Babel.
keywords: 
  - es6
  - babel
  - web midi
excerpt: 
author: davemackintosh
published: Sun Sep 20 2015 19:55:00 GMT+0000
---

I recently released Widi, a really really small library for connecting midi devices to the web and during it's development I wanted to use ES6 and Babel.

Mostly for practice and vanity, but it came with a downside. It turned my; roughly, 4kb file into a 77kb file when minified! That's shocking, It's helpful but it's shocking to know that you need to write roughly 3,100 lines of code (if your line length is 121) before your source matches the size of the shims required to make Babel work in the browser.

Anyway `</rant>`, the library simply abstracts the `navigator.requestMIDIAccess` interface to gain access to your connected MIDI devices.

It's super simple to use and does all the normalisation to the MIDI events you're expecting so you have no need to shim that (unless, like me you don't actually want 73kb of shim just for vanity's sake)

```javascript
var Widi = new (require("Widi"))()

Widi.on("deviceChange", function(device) {  
  console.log("A device has changed!", device)
  // MIDIDevice {ID: "1983081564", NAME: "nanoPAD2 PAD", MANUFACTURER: "KORG INC.", TUNING: 440, CONNECTED: false…}
})

Widi.on("midiMessage", function(midiMessageData) {  
  console.log("Received a message from MIDI device '%s'", this.NAME)
  console.log(midiMessageData)
  // {command: 144, note: 69.29565774421802, velocity: 0.6850393700787402}
})
```

If you like it, go star it but I won't be suprised if you don't want a 77kb library to do something you can do in 4kb.
