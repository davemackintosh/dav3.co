---
title: Installing idb and idb_companion on Apple ARM.
keywords: 
  - apple
  - arm
  - facebook
  - idb
  - ios
  - homebrew
  - react
  - native
  - dev
excerpt: Dave Mackintosh has developed websites, apps and libraries on mobile since 2012. here's a list of the reasons I can think of why its amazing and sometimes career saving.
author: davemackintosh
published: Tue November 17 2021 12:55:00 GMT+0000
status: draft
---

I bought a Macbook Pro a month or so ago and it's been amazing actually, the M1 chip is an absolute monster of a chip. I'm no stranger to working with/on the ARM architecture but getting some things compiled and installed can be a bit of a pain in this strange transition period of x86_64 -> arm but hey. It's a journey I've said for years was going to happen and I'm glad it finally is.

If, like me, you do React Native development you'll probably be using Flipper as your debugger and noticed that iOS devices can't be accessed without installing another bit of software first. This is IDB and it's companion. However, it doesn't actually *work* on the M1 chipset out of the box and we need to build it from source.

First thing you need to do is to uninstall your `fb_idb` program already by running `pip uninstall fb_idb` and then run the below block of code.

```bash
git clone git@github.com:facebook/idb.git
$ cd idb
$ pod install
$ ./idb_build.sh idb_companion build /opt/homebrew
$ codesign --force --sign - --timestamp=none /opt/homebrew/Frameworks/FBDeviceControl.framework/Versions/A/Resources/libShimulator.dylib
$ codesign --force --sign - --timestamp=none /opt/homebrew/Frameworks/FBSimulatorControl.framework/Versions/A/Resources/libShimulator.dylib
$ codesign --force --sign - --timestamp=none /opt/homebrew/Frameworks/XCTestBootstrap.framework/Versions/A/Resources/libShimulator.dylib
$ codesign --force --sign - --timestamp=none /opt/homebrew/Frameworks/FBControlCore.framework/Versions/A/Resources/libShimulator.dylib
$ idb_companion --version
```

After this, you can now run `pip install fb_idb` and then test with `idb list-targets` to see your devices and reopen Flipper to connect to your devices.
