---
title: That creaking sound you hear...
slug: that-creaking-sound-you-hear
date_published: 2016-10-12T15:07:42.000Z
date: 2016-10-12T15:07:42.000Z
date_updated: 2016-10-12T15:08:19.000Z
tags: ['post', 'This site']
---

...is this blog trying to live.

I'm not promising to post much, but I am at least trying to get the thing working again.

This blog lives on a Raspberry Pi in my house. It runs on the excellent [Ghost](http://ghost.org). I got it running using the latest version of Ghost at the time, which was v0.6.0, and then left it. I posted stuff, I tweaked the theme, it worked.

Then I just stopped posting, because that's what happens. Blogging always goes in phases. But one day I went into the admin interface and saw that Ghost was now on version 0.11.x and I had missed a whole load of upgrades. So I tried to upgrade... and killed the whole thing.

I ended up in a labyrinthine mess of being unable to update sqlite3 (the database that Ghost uses) on the version of Node.js I had, but if I upgraded to the new version of Node I would have to upgrade to the latest version of Ghost, and my old posts would probably get lost, as the database migrations wouldn't work...

Whatever. I've now got Ghost up to v0.7.9 and Node up to 0.12.something and I'm leaving it there until I have a little more time to do some more incremental updates, each one of which will migrate the database forward, until I get to the latest version.

At which time I will probably forget about it, and the whole thing will atrophy again.

Ho hum.
