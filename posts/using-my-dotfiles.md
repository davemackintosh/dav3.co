---
title: How to get my dotfiles set up for VIM, Ranger, neovim, compton, Awesome WM
keywords: 
  - environment
  - Arch
  - Linux
  - Termux
  - Dotfiles
  - VIM
excerpt: How to use my dotfiles and installing the dependencies it has and why they are used.
author: davemackintosh
published: 2020-03-03T09:21:24.394Z
---

I've used Linux for years, before that I used OSx but I'm firmly back on neutral ground. Earlier this year, I found the sub-culture of Linux which is "ricing" on Reddit via [`/r/unixporn`](https://reddit.com/r/unixporn) and it really interested me how these people were sharing entire operating system themes and I decided I was going to do the same.

I knew about dotfiles, I knew what they were for but for some unknown reason... I never committed mine to a repo or re-used them across any of my platforms. I use a few different devices for different contexts. 

* I use a laptop for my daily driver
  * This runs Arch Linux, Awesome WM and very little else that isn't totally necessary to my work-flow.
* I use a Surface Pro 3 for work where I need a developer tool bar 
  * I'm looking at you mobile browser vendors, we need to be able to debug *on* a device.
* I use my phone (Android) with Termux to do pretty much everything but mostly I build my open source on this platform.

So this subreddit encouraged me to devise my own config based system and actually commit it to a repository that I can simply replicate on another system (I don't ever stop tweaking) and maintain a history of my changes.

So, I now have a repo traditionally named [`dotfiles`](https://github.com/davemackintosh/dotfiles) which contains everything I need to go from a base Arch or Termux session to my confortable environment very easily.

![Screenshot of a minimalist Linux desktop with a few terminal windows open](https://raw.githubusercontent.com/davemackintosh/vex/master/vex.png)

## What configs do I have in my dotfiles repo?

* Awesome WM base which I then use my theme called [`Vex`](https://github.com/davemackintosh/vex).
* Neovim, I use Neovim nightly because it has floating window support.
  * Defx for the file browser, very fast, very configurable and very easy to use.
  * Vista for ctag based symbol navigation within a file.
  * Coc for all my language server needs
  * Fugititve for Git integration (although I probably only use it _half_ the time)
  * My custom configs and mappings.
  * fzf and fd for fast file navigation.
* Ranger - Terminal based file management.
  * Image and video previews in terminal
* Termite terminal
  * Tmux config
* Oh My ZSH config
* Z for super fast path changing.
* auto suggestions for zsh, syntax highlighting of your shell too.

### Install

My install script tries it's hardest not to smash your existing config so backs everything up to a `filename-YOURS` next to the one it then symlinks into place. This means if you want to edit any of your dotfiles, you can just fire up `nvim` in `~/dotfiles`. 

```shell
git clone https://github.com/davemackintosh/dotfiles.git ~/dotfiles
cd ~/dotfiles
bash ./install-dotfiles.sh
```

For `nvim` there is an extra step to install all the dependencies of CoC. You also need to run 

```shell
INSTALL_COC_PLUGINS="yes" nvim +source ~/.config/nvim/configs/coc.vim
```

Which will install the CoC Marketplace plugins I use to write React, TypeScript, Flow and associated linters and compilers.

You can of course `ln -s i/want/this/dotfile to/install/here` for each of the configs you actually want though.

I hope you enjoy my dotfiles :)


