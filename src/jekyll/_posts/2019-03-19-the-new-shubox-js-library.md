---
layout: post
title:  "Announcing the NEW Shubox JS Library"
image: "/assets/blog/balloons.svg"
summary: "Months later - a new and improved JS library is ready for the world."
---

![YAAAAAAAY!](https://s3.amazonaws.com/jekyll-shubox-io/localhost-5001/64ebeac6/544_andre-hunter-62014-unsplash.jpg)
<span class="bg-light-gray f7 db pa2 tr nt5 br3 br--bottom">
Photo by [Andre Hunter] on [Unsplash]
</span>

[Andre Hunter]: https://unsplash.com/@dre0316
[Unsplash]: https://unsplash.com

The Shubox mission from the beginning was simple - make it easier to get any
old arbitrary file from your computer or mobile phone to the biggest cloud
storage player in the world, Amazon S3, without having to hook up all this
boilerplate, _and_ with flexibility and flair in the user experience.

The upload from browser to S3 was table stakes. That was a given. That will
never change. Shubox will always be stupid-simple. That last part, however, has
been an evolving piece of the puzzle. In order to accomplish the "flexibility
and flair" part our users need a javascript library that provides the right
tools in order to make things flexible, while fitting the experience in
your mind's eye.

Until now(ish) we had the foundation to do this, and it was fine. We had a
javascript file generated specifically for each of our users' domains. There
were a few custom bits and bobs injected into the JS that made things work.
Over time we noticed this wasn't entirely scalable, and not entirely
conducive to having a fun development experience on our part.

I won't belabor any further with the "why's" and "how's" things needed to
change because of course there are plenty. Instead let's talk about the great
things that come with the _new_ library as a way to illustrate how this shift
will benefit not only Shubox but _YOU_, the every day developer.

1. **It is written in [TypeScript]!** It can't be understated how the marriage
   of a strong type system and superset of JavaScript have provided such a
   wonderful and comfortable development environment. Once things are all wired
   and working together I can say that "developing in JavaScript" is an
   absolute joy. Setting up Webpack and all the tooling is another story, but
   that is another (blog) story for another (blog) day.
2. **It is now [a package on NPM].** That's right, Shubox is finally joining the
   JS revolution and is distributed through the NPM package registry. Until now
   the philosophy had been to make Shubox a standalone script file, unique to
   your project/domain (per the note above) - just include it in your HTML and
   you're off to the races. The downside to this is that approach is analogous
   to purchasing a horse and buggy in the age of cars. Single page
   applications, react, vue, angular, et al, don't work that way.  So, it was
   beyond the time to get with the program.
3. **There are _many_ new features.** Let's talk about some of the new ones:

   * Transform completion callback. When your processed images are created, or
     new file formats are generated, you can watch for existence of those files
     and fire a callback function to do whatever you'd like.
   * Support for a CDN instead of amazon's bucket URL. Resulting files can now
     be referenced via your chosen CDN hostname - `cdn.mydomain.com` instead
     of `s3.amazonaws.com/my-bucket`.
   * _All_ provided options are now passed along to Dropzone.js. Previously
     there were only a subset of options moved along to the Dropzone instances.
   * You can now specify the exact S3 object key for (an) uploaded file(s).
     Very useful when you know exactly where a Shubox dropzone should end up,
     named specifically to your liking.
   * And more ... the options, new and old, are [all available to check out at
     GitHub].

4. **It is _open source_!** That's right. The Shubox TS code is all available
   and open at [our GitHub repo]. As is [this blog], mind you. Let us know over
   there if [there are any issues, comments, feature requests].
5. There is more documentation -- a LOT more documentation. With the guts of
   [everything on GitHub] the barrier to
   shipping new docs with the features is virtually nonexistent.

[TypeScript]: https://typescript.com/
[a package on NPM]: https://www.npmjs.com/package/shubox/
[there are any issues, comments, feature requests]: https://github.com/shuboxio/shubox.js/issues
[all available to check out at GitHub]: https://github.com/shuboxio/shubox.js#library-documentation
[Our GitHub repo]: https://github.com/shuboxio/shubox.js
[everything on GitHub]: https://github.com/shuboxio/shubox.js
[this blog]: https://github.com/shuboxio/site

The JavaScript that's been carrying the work-load up until now will continue to
live on for several more months until the new library makes its way to a 1.0
version. Needless to say, it will be a little while. We will not be pulling
those files off our CDN and will continue to support them. That being said -
we would still encourage you to try out the new version!

Suffice it to say, it's been a journey getting this new library whipped into
shape to the point where things felt good getting out there.
[All](https://codepen.io/shubox/pen/dNPyQV)
[of](https://codepen.io/shubox/pen/bgNVGL)
[the](https://codepen.io/shubox/pen/qRdddM)
[demos](https://codepen.io/shubox/pen/bgNKmR)
at Codepen have been updated to use the new library -- some with the
new features I outline above -- so we invite you to [kick the tires over there].
Or check out the code [at GitHub] and to let us know what you think at our
[twitter account], or email us directly at <a href="mailto:team@shubox.io">team@shubox.io</a>.
We're all ears!

[kick the tires over there]: https://codepen.io/shubox
[at GitHub]: https://github.com/shuboxio/shubox.js
[twitter account]: https://twitter.com/shuboxio
