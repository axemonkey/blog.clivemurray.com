---
title: The Ghost Post
slug: the-ghost-post
date_published: 2013-11-09T17:00:00.000Z
date: 2013-11-09T17:00:00.000Z
date_updated: 2020-02-25T17:46:10.000Z
tags: ['post', 'This site']
---

*Please note: this post was written in 2013 and is now really rather out of date.*

It occurs to me that others may want to set up a [Ghost](https://ghost.org/) blog on their Raspberry Pi, and may be interested in how I went about it.

95% of the process is [documented very helpfully here by Chris Mobberly](http://c-mobberley.com/wordpress/index.php/2013/10/20/raspberry-pi-installation-of-ghost-with-node-js-the-open-source-blogging-platform/), for which I am most grateful.

I started with a fresh install of Raspbian. My Pi's SD card is a [NOOBS](http://www.raspberrypi.org/downloads) (New Out Of Box Software) card, so all I had to do was reboot and hold down shift to go into recovery mode, and that let me reinstall Raspbian from scratch.

Then I followed Chris's splendid tutorial to get Ghost up and running on the Pi. Once it was installed and running I set it to run on port 80, and forwarded that port to the Pi on my router. At that point I could surf to my external IP address (easy to test if you have a smartphone, just turn wi-fi off and surf to it via 3G) and see the Ghost landing page.

From that point the blog was externally visible, but only via an IP address, and one which would change every now and then since I don't have a static IP from my ISP. To solve that I signed up for a free account at [noip.com](http://www.noip.com) and installed their client on the Pi. There's more on that in [this tutorial](http://people.virginia.edu/~ll2bf/docs/nix/rpi_server.html).

Soon after that was done, this blog became visible at [http://axemonkey.no-ip.biz](http://axemonkey.no-ip.biz) and even if my IP changed, the Noip client would keep the DNS pointing to the right place.

The final step was to decide on a domain name, and after a little deliberation I picked / and then upgraded my Noip account to a paid account, which then lets you use your own domain name.

Simple, really. :)
