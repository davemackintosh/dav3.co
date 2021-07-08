---
title: Installing OSX/MacOS in VirtualBox on Linux
keywords: 
  - osx
  - macos
  - install
  - virtualbox
  - linux
  - testing
excerpt: I'm developing a cross platform game/app engine and I needed a way to test my product on OSx/MacOS and I left my testing machine at the office. What do I do? Install it in VirtualBox
author: davemackintosh
published: 2020-04-09T09:44:26.456Z
---

I'm developing a cross platform engine at the moment and I was clumsy yesterday and left my macbook air at the office and decided to work from home today. I need to test this on MacOS so I decided to install it in VirtualBox.

Luckily the folks at GeekRar have a couple downloadable rars which has everything you need although they're targetted at Windows users.

![image](https://user-images.githubusercontent.com/1430657/75976672-c6d1c200-5ed2-11ea-9d23-2dafdcc4dfd1.png)

## What do you need?

* VirtualBox (you can install this from your package manager of choice)
* [VirtualBox extension pack](https://download.virtualbox.org/virtualbox/6.1.4/Oracle_VM_VirtualBox_Extension_Pack-6.1.4.vbox-extpack)
  * You'll need to run this as sudo. `sudo virtualbox path/to/Oracle_VM_VirtualBox_Extension_Pack-6.1.4.vbox-extpack`
* [the base Catalina system Virtualbox disk](https://drive.google.com/open?id=1aam0rHHgqzpCP0dyPP_1SNgvn5zSjs-i)
* [The boot disk for Catalina](https://drive.google.com/drive/folders/1xcTmJOBc9dZQMySYgW_TNpjd2YY6WV0s)

Once you have downloaded all of the above (the hard drive is about 8GB in size) you can open up Virtualbox and create a new machine. This should be called "`osx`" and you should select the OSx/MacOS machine type. Click next and when asked to create a new drive for the machine, make sure to select the unzipped hard drive image you downloaded. Click next until you're finished.

Open up the settings of the machine before starting it, make sure to increase the number of CPUs, Ram and video memory. Also enable hardware accelleration.

You'll also need to go to your storage settings and add the boot drive.

Once you've done all of this, press "OK" and close Virtualbox. You then need to run the following command before starting up your MacOS virtualbox machine.

```bash
vboxmanage modifyvm "osx" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff
vboxmanage setextradata "osx" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac11,3"
vboxmanage setextradata "osx" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
vboxmanage setextradata "osx" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Iloveapple"
vboxmanage setextradata "osx" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
vboxmanage setextradata "osx" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

Then start up your machine, it seems to take an awfully long time to boot but it *does* get there in the end!
