---
title: Using my dotfiles - 4 years later
keywords: 
  - environment
  - Linux
  - Termux
  - Dotfiles
  - NeoVIM
  - zsh
  - fish
excerpt: I've been evolving my dotfiles for a few years now, here's how to use what I have to get a developer friendly, semantic and useful terminal wherever you are.
author: davemackintosh
published: 2024-01-02T07:30:24.394Z
---

<script>
	import Heading from "$src/components/Heading.svelte"
</script>

Following on from my [post from 2020](/blog/using-my-dotfiles) and tangentially from my ["being a mobile developer"](/blog/being-a-mobile-developer) from 2018, my dotfiles have continually evolved to bring me the smoothest and fastest developer experience wherever I am. This is a natural evolution as I've worked with many a great mind between then and now, and my being an eternally lazy person looking for the easiest way to be comfortable in any environment.

I spend 99% of my time in a terminal environment and thus means I can automate just about every part of my install (I'm sure you can everywhere else too), that does however leave a 1% where I do in-fact try to use something like VSCode or Goland or CLion or some other editor from time to time and bow out pretty quickly. I don't know whether I'm stubborn or a masochist, but it is what it is and I live in a terminal.

<Heading level={2} text="What are the differences then?" />

After years and years of being a ZSH user, I noticed that on certain devices (all of them) that opening a shell was just achingly slow. I investigated different reasons from Git statuses blocking the load to slow plugins and I rebuilt my dotfiles several times over to try and resolve this several second load time to no avail. I'd heard of Fish and decided I'd give it a go, boy oh boy was this a good idea.

* I've replaced ZSH with Fish because it _"just works"_ :tm:. I did have to install the async plugin but now when I open a terminal or a split- I get it in less than a second.
* I'm now also using Starship as my prompt because of it's customisability
* I'm using Kitty as my terminal instead of Termite- this I have contention about, due to some of the conduct of the maintainer but I've yet to find a decent way to config Alacritty or Termite font rendering nicely with my chosen font.
* Neovim config has changed entirely.
* I'm not using "z" any more, but I am using zoxide which replaces it
* `direnv` for per-directory environment setup.

<Heading level={2} text="What do I get, and how do I install and use it?" />

My installer makes no attempt to install the system dependencies- I'm not building a generic installer for all permutations of environment. I know this works in a vanilla mac, termux and linux environment most of the time. The dependencies-you need to install for your platform are:

* fish
* tmux
* git
* fzf, fd and ripgrep
* neovim
* direnv

```
git clone --recursive https://github.com/davemackintosh/dotfiles.git $HOME/dotfiles 

$HOME/dotfiles/install.sh

# If you don't want to use nvim
NO_NVIM=true $HOME/dotfiles/install.sh

# You'll need to chsh -s $(which fish) to setup your env to fish instead of zsh/bash.
```

> This is a very opinionated config, my opinion to be exact and you are free to fork and change anything you want to, this config should be a good launchpad.

Well, you get a terminal. On steroids. This is my setup, it works for me on my work's Macbook, my phone (a Samsung S22) and my tablet (Samsung Tab S9 Ultra.) YMMV, but feel free to open an issue and I'll help where I can.

<Heading level={3} text="What you see first" />

* Fish + Starship + Tmux
    * TPM (termux plugin manager.)
    * Catppucin theme for Tmux
    * direnv if you have any kind of env file in your working directory (and any other directory)
* Neovim will install a heap of plugins.
    * Lazy + Mason + EFM lang server

When you land in your terminal and it's all installed you can do anything you might have done before with the added benefits of:

* Any directory with an `.envrc` file you can run `da` which is an alias to `direnv allow` to automatically load the contents of `.envrc` bash script.
* As you `cd` around your system, `z` is learning and tracking and you can then start to `z myfolder` to "jump" between folders without knowing their full path.

