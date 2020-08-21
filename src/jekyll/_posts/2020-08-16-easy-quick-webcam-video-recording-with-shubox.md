---
layout: post
title:  "Easy, Quick Webcam Video Recording with Shubox"
image: "/assets/blog/picture.svg"
summary: "If you've ever had to implement cross-browser MediaRecorder functionality (recording video from a webcam) then you'll understand that this is a big deal!"
---

I won't lie. The [WebRTC] and [MediaRecorder] API's aren't the easiest things
to get working _just right_. Not easy, still maybe a _little_ fun. Depending on
your outlook, though, Safari might suck a healthy amount of fun out of the
exercise. It's an objectively great browser but the fact remains that Apple
continues to slow-walk a number of meaningful API's. MediaRecorder is one of
them. Elsewhere on the web, [Octavian Naicu writes about] some of the
challenges you might run into with Safari/Webkit. It's a worthwhile read if you
ever expect to make the attempt yourself.

I'm happy to say that you can instead jump ahead of all that _if you're using
Shubox_. You can have all the functionality at your fingertips, without the
cross-browser debugging and headache'ery (that's not a word, but I will allow
it). I am happy to say that _*webcam video recording*_ support is now baked
into the Shubox JavaScript library.

What does that mean?

It means that your work consists of one HTML element [[1]]:

```html
<div style="width: 640px; height: 480px;"
     id="webcam-video">
</div>
```

... and a bit of javascript that will do all of the heavy lifting for you. The
following will create the video and canvas elements, and hook up click events to
start the camera, start recording, and stop recording.

```javascript
const video = new Shubox('#webcam-video', {
  key: 'SHUBOX-KEY',
  webcam: 'video',
  success: function(file) {
    console.log(`File ${file.name} successfully uploaded!`)
    console.log(file.s3url)
  },
})
```

The size of the video will be predicated on the size of the `#webcam-video`
element. Clicking the element will start the camera. Subsequent clicks of the
element will start and stop recording the video [[2]], followed by its being
uploaded to your bucket.

Of course, that's not all you are limited to. You may customize things to suit
your user experience with options to tie the different life cycle events to
other elements that may trigger them, and callbacks for different points of
that life cycle. For example:

```javascript
const videoWithOptions = new Shubox('#webcam-video', {
  key: 'SHUBOX-KEY',
  webcam: {
    type: 'video',
    startCamera: '#video-start',
    stopCamera: '#video-stop',
    startRecording: '#video-record-start',
    stopRecording: '#video-record-stop',
    audioInput: '.shubox-audioinput',
    videoInput: '.shubox-videoinput',
    cameraStarted: (_webcam) => {
      console.log("camera started")
    },
    cameraStopped: (_webcam) => {
      console.log("camera stopped")
    },
    recordingStarted: (_webcam) => {
      console.log("recording started")
    },
    recordingStopped: (_webcam, _file) => {
      console.log("recording stopped")
    }
  },
  success: file => {
    console.log(`File ${file.name} successfully uploaded!`)
    console.log(file.s3url)
  },
})
```

I'm happy to say that video recording is already being used by [our friends at
FutureMe] where the _Pro_ users are now able to record videos of themselves and
send them into the future where the past versions of themselves can impart some
old knowledge ... to ... themselves? I've confused myself.

Anyway.

If you'd like to see for yourself how this works, I also put up a small demo
[at Codepen]. Give it a whirl, and let us know what you think [on twitter]!

Notes
-----

1. <a name="note-1"></a> The size of the div will be what determines the size
   of the video. I suggest sizing it to one of the common video aspect ratios -
   4:3 or 16:9.
2. <a name="note-2"></a> Format of the video depends on which web browser you
   are using. If on Chrome or FireFox, the video will be in webm format. If on
   safari, it will be an mp4. For more details [see the source code] for how
   the codecs are chosen.

[WebRTC]: https://webrtc.github.io/samples/
[MediaRecorder]: https://developers.google.com/web/updates/2016/01/mediarecorder
[Octavian Naicu writes about]: https://blog.addpipe.com/safari-technology-preview-73-adds-limited-mediastream-recorder-api-support/
[see the source code]: https://github.com/shuboxio/shubox.js/blob/master/packages/@shubox/core/src/webcam/video_events.ts#L136-L150
[our friends at FutureMe]: https://www.futureme.org
[at Codepen]: https://codepen.io/shubox/pen/QWyQmMp
[on twitter]: https://twitter.com/shuboxio
[1]: #note-1
[2]: #note-2
