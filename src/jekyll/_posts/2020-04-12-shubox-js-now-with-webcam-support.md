---
layout: post
title:  "Shubox JS Library Now With Webcam Support"
image: "/assets/blog/picture.svg"
summary: "A sprinkle of JavaScript to fire up your webcam and upload to the cloud."
---

A few months ago I was out to lunch with my friend, Matt Sly. When he and I get
together to catch up, we'd normally shoot the breeze about anything and
everything &mdash; our families, our day jobs, basketball, politics, what have
you. Inevitably it would end up with one of us opening up our laptop to discuss
what's going on with our passion projects. For me that's Shubox, of course, and
for Matt it's [FutureMe]. FutureMe has been around for a _long_ time. Eighteen
years!  That is a _significant_ amount of time. That's a window of time to
accrue a healthy amount of cruft and old tech, a patina of bits and bytes in a
long-lived codebase. Which leads us to this particular lunch for Matt and I.
This time there was something specific that caught my eye while Matt and I were
looking over the FutureMe code &mdash; something so stark that I was compelled
to ask, “Friend, what on earth is this _SWF_ file?”

He replied that “that is a remnant from the days I allowed people to take
photos of themselves and attach them to the letters they'd send to themselves
in the future”. It was a Flash component that interfaced with webcams.

We bandied around the idea that with the native controls available in browsers
these days he, we, _could_ replace that old relic with good old JavaScript.

“Why don't you build that right into Shubox? Think you could?”, he asked.

Think I could? Was that a challenge? Well. Challenge accepted.

That little feature is now released to npm with [version 0.3.0] of the Shubox
JS library. It's a preliminary take on support for webcam(s) where there exists
some opportunity for further refinement and growth. Things to be added in the
future &mdash; selecting from available cameras, video and audio support, event
lifecycle callbacks, etc.

To give you an idea of what it takes to get this set up, let's show you a
little code. If we have a div that's properly sized to hold the camera preview:

```html
<div id="webcam-photo"
     class="webcam"
     style="width: 640px; height: 360px;"></div>

<script type="text/javascript">
  new Shubox('#webcam-photo', {
    key: '[shubox key]',
    webcam: 'photo',
    success: function(file) {
      console.log(file.s3url)
    },
  })
</script>
```

Done! That is _it_! If you've set up your bucket correctly, clicking
the div will start the camera. Clicking it again will take the photo. And then
finally upload it to S3.

For more information, documentation, demos, gifs, [visit the GitHub repo] and
take a look! If you'd like to see this in action head over to [FutureMe] and
write the _future you_ a letter. Attach a selfie while you're at it!

[FutureMe]: https://www.futureme.org
[version 0.3.0]: https://www.npmjs.com/package/shubox/v/0.3.0
[visit the GitHub repo]: https://github.com/shuboxio/shubox.js#capture-a-photo-with-your-webcam
